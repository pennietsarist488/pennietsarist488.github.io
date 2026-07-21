// ---------- Script ---------- //

  document.documentElement.classList.remove('no-js');

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Scroll reveal (falls back to fully visible if IntersectionObserver isn't available)
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.documentElement.classList.add('no-io');
  }

  // fonction générique pour remplir un bloc
  function fillBlock(blockNumber, titleValue, itemsKey) {
    const block = netDesc.querySelector(`.node-block[data-block="${blockNumber}"]`);
    block.querySelector('.node-texttitle').textContent = titleValue;

    const items = itemsKey
      ? itemsKey.split(".").reduce((obj, i) => obj?.[i], currentTranslations)
      : null;

    const ul = block.querySelector('.node-textitems');
    ul.innerHTML = "";
    if (Array.isArray(items)) {
      items.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
      });
    }
  }

  // Network hover/focus interactions
  const netDesc = document.getElementById('netDesc');
  document.querySelectorAll('.net-node').forEach(node => {
    const show = () => {
      document.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const circle = node.querySelector('circle');
      circle.setAttribute('r', 20);
      
      netDesc.querySelector('.node-subtitle').textContent = node.dataset.subtitle;

      netDesc.querySelector('.node-texttitle').textContent = node.dataset.texttitle;

      fillBlock(1, node.dataset.text1title, node.dataset.i18nList1);
      fillBlock(2, node.dataset.text2title, node.dataset.i18nList2);

      // Récupère la clé du tableau à partir de l'attribut data-i18n-list
      //const listKey = node.dataset.i18nList; // "approach.node1_testitems"
      //const items = listKey
        //? listKey.split(".").reduce((obj, i) => obj?.[i], currentTranslations)
        //: null;

      //const ul = netDesc.querySelector(".node-textitems");
      //ul.innerHTML = ""; // vide la liste précédente
      //if (Array.isArray(items)) {
        //items.forEach(text => {
          //const li = document.createElement("li");
          //li.textContent = text;
          //ul.appendChild(li);
        //});
      //}
    };
    
    const hide = () => {
      const circle = node.querySelector('circle');
      circle.setAttribute('r', 16);
    };
    node.addEventListener('mouseenter', show);
    node.addEventListener('focus', show);
    node.addEventListener('mouseleave', hide);
  });
