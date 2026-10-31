(() => {
  "use strict";

  const demoSvg = (category, color = "#b9c6c1", edited = false) => {
    const garment = category === "Pants"
      ? `<path d="M82 57h76l12 158h-42l-9-88-8 88H69z" fill="${color}"/><path d="M83 67h72" stroke="#e9e6df" stroke-opacity=".45" stroke-width="3"/>`
      : category === "Shoes"
        ? `<path d="M55 151c17-2 34-22 44-54l27 6c4 24 18 42 42 52 10 4 17 14 17 25v10H56c-12 0-20-8-18-18 2-11 7-19 17-21z" fill="${color}"/><path d="M50 175h128" stroke="#f4f2ed" stroke-opacity=".6" stroke-width="4"/>`
        : category === "Accessories"
          ? `<path d="M77 142c-17-26 3-66 45-66s62 40 45 66l-45 56z" fill="none" stroke="${color}" stroke-width="8"/><circle cx="122" cy="157" r="20" fill="${color}"/><path d="M122 177v27" stroke="${color}" stroke-width="5"/>`
          : `<path d="M90 57c10 9 19 13 32 13s22-4 32-13l43 24-21 46-21-10v98H89v-98l-21 10-21-46z" fill="${color}"/><path d="M101 62c2 17 10 27 21 27s19-10 21-27" fill="none" stroke="#f4f2ed" stroke-opacity=".48" stroke-width="4"/>${category === "Shirts" ? `<path d="m109 75 13 14 13-14-8 61h-10z" fill="#171d1f"/><path d="M121 91v102" stroke="#f4f2ed" stroke-opacity=".5" stroke-width="2"/>` : ""}${category === "Sweatshirts" ? `<path d="M101 61c0-17 9-26 21-26s21 9 21 26" fill="none" stroke="${color}" stroke-width="9"/>` : ""}`;
    const background = edited ? "#253c40" : "#20292b";
    const stamp = edited ? "DEMO EDIT" : "SAMPLE VISUAL";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 244"><defs><radialGradient id="g"><stop stop-color="${background}"/><stop offset="1" stop-color="#111719"/></radialGradient></defs><rect width="244" height="244" rx="18" fill="url(#g)"/><circle cx="122" cy="114" r="86" fill="#ffffff" opacity=".025"/>${garment}<text x="16" y="226" fill="#dce6e2" fill-opacity=".68" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">${stamp}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const proposals = [
    { id: "demo-tee", name: "Washed Cotton Box Tee", category: "T-shirts", price: 699, sourceUrl: "https://example.com/demo/washed-cotton-tee", analysis: "<strong>Trend signal:</strong> Relaxed proportions and garment-dyed texture keep showing up in everyday streetwear edits. A versatile neutral can work beyond a single microtrend.", image: "images/tshirt/2.png", editedImage: demoSvg("T-shirts", "#b9aa91", true), status: "Pending", submitted: "Today · 10:24 AM" },
    { id: "demo-shirt", name: "Soft Structure Overshirt", category: "Shirts", price: 1_299, sourceUrl: "https://example.com/demo/soft-structure-shirt", analysis: "<strong>Trend signal:</strong> Light layering pieces bridge warm afternoons and cooler evenings. The muted olive tone pairs naturally with denim and relaxed trousers.", image: "images/hero-shirt.png", editedImage: null, status: "Pending", submitted: "Today · 9:48 AM" },
    { id: "demo-pants", name: "Everyday Straight-Leg Trouser", category: "Pants", price: 1_099, sourceUrl: "https://example.com/demo/straight-leg-trouser", analysis: "<strong>Trend signal:</strong> A straighter leg offers a polished alternative to very wide silhouettes while keeping the easy, roomy fit shoppers want.", image: "images/pant/Zaysh 01.png", editedImage: null, status: "Pending", submitted: "Today · 9:15 AM" },
    { id: "demo-sweatshirt", name: "Clubhouse Fleece Crew", category: "Sweatshirts", price: 1_499, sourceUrl: "https://example.com/demo/clubhouse-fleece", analysis: "<strong>Trend signal:</strong> Sport references are moving into daily basics. A clean crewneck with a compact graphic keeps the look wearable and easy to style.", image: demoSvg("Sweatshirts", "#b77c62"), editedImage: null, status: "Approved", submitted: "Yesterday · 4:05 PM" },
    { id: "demo-shoes", name: "Retro Court Low-Top", category: "Shoes", price: 1_899, sourceUrl: "https://example.com/demo/retro-court-low", analysis: "<strong>Trend signal:</strong> Slim court profiles and subtle vintage details continue to anchor casual outfits. Consider the finish and outsole durability before sourcing.", image: demoSvg("Shoes", "#d5c9af"), editedImage: null, status: "Pending", submitted: "Yesterday · 2:32 PM" },
    { id: "demo-accessory", name: "Silver Tone Link Bracelet", category: "Accessories", price: 399, sourceUrl: "https://example.com/demo/link-bracelet", analysis: "<strong>Trend signal:</strong> Simple metal accents are an easy entry point for shoppers building a layered look. Keep the product story focused on finish and scale.", image: "images/acc/4b.png", editedImage: null, status: "Denied", submitted: "Yesterday · 12:10 PM" },
    { id: "demo-combo", name: "The Weekend Pairing", category: "Combo", price: 1_249, sourceUrl: "https://example.com/demo/weekend-pairing", analysis: "<strong>Trend signal:</strong> Ready-made outfit pairings reduce styling effort. This set works best when both pieces can also be discovered and purchased separately.", image: "images/Combo/5.2.png", editedImage: null, status: "Approved", submitted: "16 Oct · 3:40 PM" }
  ];

  const state = { status: "All", category: "All", query: "", pendingDecision: null };
  const grid = document.getElementById("proposal-grid");
  const emptyState = document.getElementById("empty-state");
  const dialog = document.getElementById("decision-dialog");
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  function renderCard(item) {
    const comparison = item.editedImage
      ? `<div class="comparison" aria-label="Original and illustrative edited preview"><div class="comparison-pane"><span class="mini-label">Original image</span><div class="comparison-image"><img src="${escapeHtml(item.image)}" alt="Original sample image for ${escapeHtml(item.name)}" loading="lazy"></div></div><div class="comparison-pane"><span class="mini-label">AI edit preview</span><div class="comparison-image"><img src="${escapeHtml(item.editedImage)}" alt="Illustrative edited preview for ${escapeHtml(item.name)}" loading="lazy"><span class="mock-tag">ILLUSTRATIVE MOCK</span></div></div><p class="comparison-note">UI demonstration visual only. This is not output from an image model.</p></div>`
      : `<div class="comparison" hidden></div>`;
    const actions = item.status === "Pending"
      ? `<div class="decision-actions"><button class="button button-deny" type="button" data-decision="Denied" data-id="${escapeHtml(item.id)}" aria-label="Deny ${escapeHtml(item.name)}">Deny</button><button class="button button-approve" type="button" data-decision="Approved" data-id="${escapeHtml(item.id)}" aria-label="Approve ${escapeHtml(item.name)}">✓ Approve</button></div>`
      : `<span class="locked-decision">Decision recorded in this demo</span>`;
    return `<article class="proposal-card" aria-labelledby="title-${escapeHtml(item.id)}">
      <div class="card-top"><span class="category-label">${escapeHtml(item.category)}</span><span class="status-pill" data-status="${escapeHtml(item.status)}"><i class="status-dot" aria-hidden="true"></i>${escapeHtml(item.status)}</span></div>
      <div class="card-body">
        <div class="product-art"><img src="${escapeHtml(item.image)}" alt="Sample product image: ${escapeHtml(item.name)}" loading="lazy"><span class="art-caption">SAMPLE PRODUCT</span><span class="art-watermark" aria-hidden="true">MF / 01</span></div>
        <div class="product-info"><h3 id="title-${escapeHtml(item.id)}">${escapeHtml(item.name)}</h3><p class="product-price">₹${Number(item.price).toLocaleString("en-IN")}</p><div class="source-block"><span class="mini-label">Source URL · demo</span><span class="source-url">${escapeHtml(item.sourceUrl)}</span></div><div class="analysis"><span class="mini-label">Gemini trend analysis · sample</span><p>${item.analysis}</p></div></div>
        ${comparison}
      </div>
      <div class="card-footer"><span class="submitted">Added ${escapeHtml(item.submitted)}</span>${actions}</div>
    </article>`;
  }

  function visibleItems() {
    const query = state.query.trim().toLocaleLowerCase();
    return proposals.filter(item => {
      const matchesStatus = state.status === "All" || item.status === state.status;
      const matchesCategory = state.category === "All" || item.category === state.category;
      const searchable = `${item.name} ${item.category} ${item.sourceUrl} ${item.analysis}`.toLocaleLowerCase();
      return matchesStatus && matchesCategory && (!query || searchable.includes(query));
    });
  }

  function updateSummary() {
    const counts = { All: proposals.length, Pending: 0, Approved: 0, Denied: 0 };
    proposals.forEach(item => counts[item.status]++);
    document.getElementById("stat-total").textContent = proposals.length;
    Object.entries(counts).forEach(([status, count]) => {
      document.querySelector(`[data-count="${status}"]`).textContent = count;
      const stat = document.getElementById(`stat-${status.toLowerCase()}`);
      if (stat) stat.textContent = count;
    });
  }

  function render() {
    const items = visibleItems();
    grid.innerHTML = items.map(renderCard).join("");
    grid.hidden = items.length === 0;
    emptyState.hidden = items.length !== 0;
    document.getElementById("results-summary").textContent = `${items.length} ${items.length === 1 ? "proposal" : "proposals"} shown · demonstration data`;
    updateSummary();
  }

  document.querySelectorAll(".filter-tab").forEach(button => button.addEventListener("click", () => {
    state.status = button.dataset.status;
    document.querySelectorAll(".filter-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    render();
  }));
  document.getElementById("category-filter").addEventListener("change", event => { state.category = event.target.value; render(); });
  document.getElementById("proposal-search").addEventListener("input", event => { state.query = event.target.value; render(); });
  document.getElementById("clear-filters").addEventListener("click", () => {
    state.status = "All"; state.category = "All"; state.query = "";
    document.getElementById("category-filter").value = "All";
    document.getElementById("proposal-search").value = "";
    document.querySelector('[data-status="All"]').click();
  });

  grid.addEventListener("click", event => {
    const button = event.target.closest("button[data-decision]");
    if (!button) return;
    const item = proposals.find(proposal => proposal.id === button.dataset.id && proposal.status === "Pending");
    if (!item) return;
    state.pendingDecision = { id: item.id, status: button.dataset.decision };
    document.getElementById("dialog-product-name").textContent = item.name;
    document.getElementById("dialog-action-copy").textContent = `${state.pendingDecision.status} · demonstration decision only`;
    const confirmButton = document.getElementById("confirm-decision");
    confirmButton.textContent = state.pendingDecision.status === "Approved" ? "Confirm approval" : "Confirm denial";
    confirmButton.dataset.status = state.pendingDecision.status;
    dialog.showModal();
  });

  document.getElementById("confirm-decision").addEventListener("click", () => {
    if (!state.pendingDecision) return;
    const item = proposals.find(proposal => proposal.id === state.pendingDecision.id);
    if (!item || item.status !== "Pending") return;
    item.status = state.pendingDecision.status;
    document.getElementById("announcer").textContent = `${item.name} marked ${item.status}. This is a temporary demo decision.`;
    state.pendingDecision = null;
    dialog.close();
    render();
  });
  dialog.addEventListener("close", () => { state.pendingDecision = null; });

  render();
})();
