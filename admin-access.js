(() => {
  if (window.__tn2tnAdminAccessInstalled) return;
  window.__tn2tnAdminAccessInstalled = true;

  const SUPABASE_URL = "https://lnjeyqwteautkvwrkgbe.supabase.co";
  const SUPABASE_KEY = "sb_publishable_T0lmc-JHGB-h9MXAVFEukQ_-oJ3NEpE";
  const pageAlreadyHasOwnerModal = Boolean(document.getElementById("ownerLoginOverlay"));

  function ensureModal() {
    let overlay = document.getElementById("ownerLoginOverlay");
    if (overlay) return overlay;

    const style = document.createElement("style");
    style.textContent = `
      #ownerLoginOverlay{display:none;position:fixed;inset:0;z-index:100001;background:radial-gradient(ellipse at center,rgba(116,31,48,.25),transparent 62%),rgba(0,0,0,.88);align-items:center;justify-content:center;padding:20px;font-family:Arial,sans-serif;animation:ownerOverlayIn .28s ease both}
      #ownerLoginBox{position:relative;overflow:hidden;width:min(410px,100%);padding:34px 30px;border:1px solid rgba(230,75,105,.72);border-radius:20px;background:linear-gradient(145deg,#241018 0%,#111015 58%,#260d17 100%);color:#fff;text-align:center;box-shadow:0 0 0 1px rgba(255,90,120,.12) inset,0 0 22px rgba(180,25,60,.32),0 18px 65px #000b;animation:ownerBoxIn .48s cubic-bezier(.2,.8,.2,1) both,ownerGlow 3.4s ease-in-out .5s infinite}
      #ownerLoginBox:before{content:"";position:absolute;inset:0 15% auto;height:1px;background:linear-gradient(90deg,transparent,rgba(255,120,145,.9),transparent);box-shadow:0 0 18px rgba(255,75,110,.8)}
      #ownerLoginBox h2{margin:0 0 12px;color:#ffb1c0;font-size:25px;letter-spacing:.04em;text-shadow:0 0 10px rgba(255,75,110,.55)}
      #ownerLoginBox p{color:#e4d9de;line-height:1.55}
      #ownerLoginBox button{margin:10px 5px 0;padding:12px 18px;border:1px solid transparent;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700;transition:transform .2s ease,box-shadow .2s ease,background .2s ease}
      #ownerLoginBox button:hover{transform:translateY(-2px)}
      #ownerLoginBox button:focus-visible{outline:2px solid #ffc1ce;outline-offset:3px}
      #ownerGoogleSignIn{background:linear-gradient(135deg,#a72c49,#67172e);color:white;border-color:rgba(255,150,170,.35);box-shadow:0 0 15px rgba(190,35,75,.28)}
      #ownerGoogleSignIn:hover{box-shadow:0 0 22px rgba(255,55,105,.58);background:linear-gradient(135deg,#c23859,#7a1b37)}
      #ownerLoginClose{background:#29252d;color:#e8dce1;border-color:#51404a}
      #ownerLoginClose:hover{background:#39303a;box-shadow:0 0 14px rgba(255,255,255,.12)}
      #ownerLoginStatus{min-height:20px;font-size:13px;color:#ffc0cd}
      @keyframes ownerOverlayIn{from{opacity:0}to{opacity:1}}
      @keyframes ownerBoxIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes ownerGlow{0%,100%{box-shadow:0 0 0 1px rgba(255,90,120,.12) inset,0 0 22px rgba(180,25,60,.28),0 18px 65px #000b}50%{box-shadow:0 0 0 1px rgba(255,90,120,.2) inset,0 0 34px rgba(220,35,80,.48),0 18px 65px #000b}}
      @media(prefers-reduced-motion:reduce){#ownerLoginOverlay,#ownerLoginBox{animation:none}#ownerLoginBox button{transition:none}}
    `;
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.id = "ownerLoginOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = '<div id="ownerLoginBox"><h2>Owner sign-in</h2><p>Sign in with the authorised Google account to continue.</p><p id="ownerLoginStatus" aria-live="polite"></p><button id="ownerGoogleSignIn" type="button">Continue with Google</button><button id="ownerLoginClose" type="button">Cancel</button></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  let typed = "";
  let lastKeyTime = 0;

  // Capture the shortcut before page-level keyboard handlers can interfere.
  window.addEventListener("keydown", event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    const target = event.target;
    if (target && (
      target.isContentEditable ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || "")
    )) return;

    if (event.key === "Escape") {
      const overlay = document.getElementById("ownerLoginOverlay");
      if (overlay) overlay.style.display = "none";
      typed = "";
      return;
    }

    if (!event.key || event.key.length !== 1) return;

    const now = Date.now();
    if (now - lastKeyTime > 2000) typed = "";
    lastKeyTime = now;
    typed = (typed + event.key.toLowerCase()).slice(-5);

    if (typed === "admin") {
      const overlay = ensureModal();
      overlay.style.display = "flex";
      const status = document.getElementById("ownerLoginStatus");
      if (status) status.textContent = "";
      typed = "";
    }
  }, true);

  // The homepage has its own sign-in handler; do not attach a duplicate there.
  if (!pageAlreadyHasOwnerModal) {
    document.addEventListener("click", async event => {
      const clicked = event.target && event.target.closest
        ? event.target.closest("#ownerLoginClose, #ownerGoogleSignIn, #ownerLoginOverlay")
        : null;
      if (!clicked) return;

      if (clicked.id === "ownerLoginClose" || clicked.id === "ownerLoginOverlay") {
        const overlay = document.getElementById("ownerLoginOverlay");
        if (overlay) overlay.style.display = "none";
        return;
      }

      const button = clicked;
      const status = document.getElementById("ownerLoginStatus");
      button.disabled = true;
      if (status) status.textContent = "Opening Google sign-in…";

      try {
        if (!window.supabase || typeof window.supabase.createClient !== "function") {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            script.onload = resolve;
            script.onerror = () => reject(new Error("Could not load the sign-in service."));
            document.head.appendChild(script);
          });
        }

        if (!window.supabase || typeof window.supabase.createClient !== "function") {
          throw new Error("The sign-in service did not load. Please refresh and try again.");
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
