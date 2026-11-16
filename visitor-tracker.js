(() => {
  const SUPABASE_URL = "https://lnjeyqwteautkvwrkgbe.supabase.co";
  const SUPABASE_KEY = "sb_publishable_T0lmc-JHGB-h9MXAVFEukQ_-oJ3NEpE";

  function start() {
    if (!window.supabase?.createClient) return;

    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const sessionKey = "tn2tn_visitor_session";
    let sessionId = localStorage.getItem(sessionKey);

    if (!sessionId) {
      sessionId = crypto.randomUUID
        ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
          });
      localStorage.setItem(sessionKey, sessionId);
    }

    const heartbeat = () => {
      fetch(`${SUPABASE_URL}/functions/v1/record-visitor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY
        },
        body: JSON.stringify({
          session_id: sessionId,
          page_path: window.location.pathname
        })
      }).then(async response => {
        if (!response.ok) {
          const detail = await response.text();
          throw new Error(detail || `HTTP ${response.status}`);
        }
      }).catch(error => console.warn("Visitor heartbeat failed:", error));
    };

    heartbeat();
    window.setInterval(heartbeat, 60_000);

    async function applySiteSettings() {
      const [{ data: sections, error: sectionsError }, { data: siteRows, error: siteError }] =
        await Promise.all([
          db.from("section_settings").select("section_key, enabled"),
          db.from("site_settings").select("maintenance_mode, maintenance_message").limit(1)
        ]);

      if (sectionsError) console.warn("Could not load section settings:", sectionsError.message);
      if (!sectionsError && sections) {
        const settings = Object.fromEntries(sections.map(row => [row.section_key, row.enabled]));

        // Apply both ON and OFF states on every page that includes this tracker.
        const quotesEnabled = settings.quote_overlay !== false;
        const quoteButtons = [...document.querySelectorAll("button")]
          .filter(button => button.textContent.trim().toLowerCase().includes("show today's quote"));
        quoteButtons.forEach(button => { button.hidden = !quotesEnabled; });
        const quoteOverlay = document.getElementById("quoteOverlay");
        if (quoteOverlay && !quotesEnabled) quoteOverlay.hidden = true;

        const galleryEnabled = settings.podcast_gallery !== false;
        document.querySelectorAll(".gallery-container, #galleryContainer")
          .forEach(gallery => { gallery.hidden = !galleryEnabled; });
      }

      if (siteError) {
        console.warn("Could not load site status:", siteError.message);
        return;
      }

      const site = siteRows?.[0];
      if (site?.maintenance_mode) {
        const cover = document.createElement("div");
        cover.id = "site-maintenance-cover";
        cover.setAttribute("role", "alert");
        const style = document.createElement("style");
        style.textContent = `
          #site-maintenance-cover { position:fixed; inset:0; z-index:99999; display:grid; place-items:center; padding:24px; background:#222; color:#fff; font-family:Arial,sans-serif; text-align:center; }
          #site-maintenance-cover .maintenance-card { width:min(560px,100%); padding:36px; border:1px solid #46515c; border-radius:16px; background:#31343c; }
          #site-maintenance-cover h1 { margin:0 0 14px; color:#9fc5e8; }
          #site-maintenance-cover p { margin:0; line-height:1.6; color:#d5dbe0; }
        `;
        document.head.appendChild(style);
        cover.innerHTML = `
          <div class="maintenance-card">
            <h1>We'll be right back</h1>
            <p></p>
          </div>`;
        cover.querySelector("p").textContent =
          site.maintenance_message || "The website is temporarily unavailable while we carry out maintenance.";
        document.body.appendChild(cover);
      }
    }

    applySiteSettings().catch(error => console.warn("Could not apply site settings:", error));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
