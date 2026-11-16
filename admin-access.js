(() => {
  if (window.__tn2tnAdminAccessInstalled) return;
  window.__tn2tnAdminAccessInstalled = true;
  const SUPABASE_URL = "https://lnjeyqwteautkvwrkgbe.supabase.co";
  const SUPABASE_KEY = "sb_publishable_T0lmc-JHGB-h9MXAVFEukQ_-oJ3NEpE";
  const existingModal = Boolean(document.getElementById("ownerLoginOverlay"));

  function ensureModal() {
    let overlay = document.getElementById("ownerLoginOverlay");
    if (overlay) return overlay;
    const style = document.createElement("style");
    style.textContent = `
      #ownerLoginOverlay{display:none;position:fixed;inset:0;z-index:100001;background:rgba(0,0,0,.84);align-items:center;justify-content:center;padding:20px;font-family:Arial,sans-serif}
      #ownerLoginBox{width:min(390px,100%);padding:28px;border:1px solid #596574;border-radius:16px;background:#242126;color:#fff;text-align:center;box-shadow:0 12px 40px #0008}
      #ownerLoginBox h2{margin:0 0 12px;color:#d7a0a8}#ownerLoginBox p{color:#d5dbe0;line-height:1.5}
      #ownerLoginBox button{margin:8px 5px 0;padding:11px 17px;border:0;border-radius:8px;cursor:pointer;font-size:14px}
      #ownerGoogleSignIn{background:#741f30;color:white}#ownerLoginClose{background:#555b63;color:white}#ownerLoginStatus{min-height:20px;font-size:13px}
    `;
    document.head.appendChild(style);
    overlay = document.createElement("div");
    overlay.id = "ownerLoginOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = '<div id="ownerLoginBox"><h2>Owner sign-in</h2><p>Sign in with the authorised Google account to continue.</p><p id="ownerLoginStatus" aria-live="polite"></p><button id="ownerGoogleSignIn">Continue with Google</button><button id="ownerLoginClose">Cancel</button></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  let typed = "";
  let lastKeyTime = 0;
  document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.target && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;
    const now = Date.now();
    if (now - lastKeyTime > 1800) typed = "";
    lastKeyTime = now;
    if (event.key.length === 1) {
      typed = (typed + event.key.toLowerCase()).slice(-5);
      if (typed === "admin") {
        ensureModal().style.display = "flex";
        const status = document.getElementById("ownerLoginStatus");
        if (status) status.textContent = "";
        typed = "";
      }
    } else if (event.key === "Escape") {
      const overlay = document.getElementById("ownerLoginOverlay");
      if (overlay) overlay.style.display = "none";
      typed = "";
    }
  });

  if (!existingModal) {
    document.addEventListener("click", async event => {
      if (event.target.id === "ownerLoginClose" || event.target.id === "ownerLoginOverlay") {
        const overlay = document.getElementById("ownerLoginOverlay");
        if (overlay) overlay.style.display = "none";
        return;
      }
      if (event.target.id !== "ownerGoogleSignIn") return;
      const status = document.getElementById("ownerLoginStatus");
      const button = event.target;
      button.disabled = true;
      if (status) status.textContent = "Opening Google sign-in…";
      try {
        if (!window.supabase?.createClient) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            script.onload = resolve;
            script.onerror = () => reject(new Error("Could not load the sign-in service."));
            document.head.appendChild(script);
          });
        }
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error } = await client.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin + "/admin.html" }
        });
        if (error) throw error;
      } catch (error) {
        if (status) status.textContent = error.message || "Sign-in could not start. Please try again.";
        button.disabled = false;
      }
    });
  }
})();