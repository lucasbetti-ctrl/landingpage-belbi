// =========================================
//  BELBI — Landing Page Scripts
// =========================================

// --- MOBILE BURGER ---
const burger    = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
});

mobileNav.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// --- SCROLL ANIMATIONS ---
const fadeEls = document.querySelectorAll(
  '.solution__item, .diffs__item, .pain__item, .authority__badge, .solutions__diagnostic, .solutions__grid'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const staticFadeEls = document.querySelectorAll(
  '.solution__image-col'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));
staticFadeEls.forEach(el => observer.observe(el));

document.querySelectorAll('.diffs__grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

// --- FORM SUBMIT ---
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwzYsPGQOB_9z5lnKr1_w0ibFLWSY-lYX_tTTvJCT6xNrUSi-aum1Zuza69mdGmV1Ft/exec';

const form = document.getElementById('contactForm');
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    })
      .catch(() => {})
      .finally(() => {
        if (typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
          setTimeout(() => {
            submitBtn.innerHTML = submitBtnDefaultHTML;
          }, 4000);
        }
      });
  });
}

// --- SOLUTIONS MODAL ---
const solutionsContent = {
  diagnostico: {
    kicker: "Como começamos",
    title: "Diagnóstico organizacional",
    lead: "Antes de propor uma solução, a Belbi busca compreender a realidade da organização, seus desafios, prioridades, relações e práticas.",
    boxes: [
      ["O que observamos", "Pessoas, liderança, comunicação, processos, cultura, estratégia e fatores que influenciam o trabalho."],
      ["Possíveis entregas", "Escutas, leitura de contexto, identificação de prioridades e recomendações para a construção da jornada."],
      ["Resultado esperado", "Uma solução conectada às necessidades reais da organização, evitando respostas prontas e ações desconectadas."]
    ]
  },
  "futuros-pf": {
    kicker: "Soluções para você",
    title: "Futuros líderes",
    lead: "Preparação para profissionais que desejam desenvolver prontidão antes de assumir a primeira posição formal de liderança.",
    personalization: "Os temas, exemplos, ferramentas e a profundidade dos encontros são personalizados de acordo com o momento profissional, os desafios e os objetivos da pessoa.",
    modules: [
      ["01", "Autoconhecimento", "Reconhecer padrões pessoais"],
      ["02", "Inteligência emocional", "Administrar reações"],
      ["03", "Comunicação", "Escutar e se posicionar"],
      ["04", "Segurança psicológica", "Criar espaço para participação"],
      ["05", "Feedback", "Orientar comportamentos"],
      ["06", "Conflitos", "Mediar divergências"],
      ["07", "Delegação e desempenho", "Distribuir e acompanhar o trabalho"],
      ["08", "Gestão de pessoas", "Conduzir processos"]
    ],
    boxes: [["Foco", "Autoconhecimento, influência, comunicação, visão de gestão e tomada de decisão."], ["Formato", "Jornada de desenvolvimento ou encontros individuais, on-line ou presenciais."]]
  },
  "primeira-pf": {
    kicker: "Soluções para você",
    title: "Primeira liderança",
    lead: "Apoio para profissionais que assumiram recentemente a gestão e precisam transformar conhecimento em práticas de liderança mais conscientes.",
    personalization: "Os temas, exemplos, ferramentas e a profundidade dos encontros são personalizados de acordo com o momento profissional, os desafios e os objetivos da pessoa.",
    modules: [
      ["01", "Da técnica à liderança", "Autoconhecimento"],
      ["02", "Decisões que orientam a equipe", "Padronização de critérios"],
      ["03", "Ferramentas essenciais da gestão de pessoas", "Gestão de pessoas"],
      ["04", "Segurança psicológica na prática da equipe", "Segurança psicológica"],
      ["05", "Feedback com humildade", "Feedback"],
      ["06", "Conversas difíceis, lideranças corajosas", "Condução de conversas difíceis"],
      ["07", "Gestão de conflitos e círculo de confiança", "Gestão de conflitos"],
      ["08", "Sustentando a prática de liderar", "PDI e sustentação"]
    ],
    boxes: [["Indicado para", "Profissionais que atuam há até três anos na função de liderança."], ["Foco", "Comunicação, feedbacks, conflitos, delegação, cobrança e gestão de pessoas na prática."]]
  },
  "mentoria-pf": {
    kicker: "Soluções para você",
    title: "Mentorias",
    lead: "Acompanhamento individual e personalizado para refletir sobre desafios reais e construir caminhos de ação.",
    boxes: [["Como funciona", "Encontros avulsos ou ciclos definidos por objetivo."], ["Possíveis temas", "Transição para liderança, posicionamento, comunicação, tomada de decisão e desafios de equipe."]]
  },
  "futuros-pj": {
    kicker: "Desenvolvimento de lideranças",
    title: "Futuros líderes",
    lead: "Preparação de talentos internos, especialistas e profissionais mapeados para sucessão.",
    personalization: "Os temas, exemplos, ferramentas e a profundidade dos encontros são personalizados de acordo com o contexto, os desafios e o nível de maturidade da empresa.",
    modules: [
      ["01", "Autoconhecimento", "Reconhecer padrões pessoais"],
      ["02", "Inteligência emocional", "Administrar reações"],
      ["03", "Comunicação", "Escutar e se posicionar"],
      ["04", "Segurança psicológica", "Criar espaço para participação"],
      ["05", "Feedback", "Orientar comportamentos"],
      ["06", "Conflitos", "Mediar divergências"],
      ["07", "Delegação e desempenho", "Distribuir e acompanhar o trabalho"],
      ["08", "Gestão de pessoas", "Conduzir processos"]
    ],
    boxes: [["Objetivo", "Aumentar a prontidão para assumir responsabilidades de liderança."], ["Formato", "Trilha personalizada, construída a partir das competências e desafios da organização."]]
  },
  "primeira-pj": {
    kicker: "Desenvolvimento de lideranças",
    title: "Primeira liderança",
    lead: "Jornada para novos gestores desenvolverem repertório e segurança para conduzir pessoas, conversas, decisões e resultados.",
    personalization: "Os temas, exemplos, ferramentas e a profundidade dos encontros são personalizados de acordo com o contexto, os desafios e o nível de maturidade da empresa.",
    modules: [
      ["01", "Da técnica à liderança", "Autoconhecimento"],
      ["02", "Decisões que orientam a equipe", "Padronização de critérios"],
      ["03", "Ferramentas essenciais da gestão de pessoas", "Gestão de pessoas"],
      ["04", "Segurança psicológica na prática da equipe", "Segurança psicológica"],
      ["05", "Feedback com humildade", "Feedback"],
      ["06", "Conversas difíceis, lideranças corajosas", "Condução de conversas difíceis"],
      ["07", "Gestão de conflitos e círculo de confiança", "Gestão de conflitos"],
      ["08", "Sustentando a prática de liderar", "PDI e sustentação"]
    ],
    boxes: [["Indicado para", "Grupos recém-promovidos ou lideranças com até três anos na função."], ["Possíveis entregas", "Diagnóstico, encontros, estudos de caso, práticas, plano de ação e acompanhamento."]]
  },
  "lideres-lideres": {
    kicker: "Desenvolvimento de lideranças",
    title: "Líderes de líderes",
    lead: "Desenvolvimento para gestores responsáveis por conduzir outras lideranças, sustentar práticas coerentes de gestão e orientar situações relacionadas à saúde mental no trabalho.",
    boxes: [
      ["Foco em gestão", "Visão sistêmica, alinhamento, responsabilização, comunicação, cultura e desenvolvimento de outras lideranças."],
      ["Indicado para", "Gerentes, coordenadores seniores, heads e demais profissionais que lideram gestores."],
      ["Sensibilização em saúde mental", "Preparação para reconhecer sinais de atenção, acolher, orientar e encaminhar situações com responsabilidade."],
      ["Limites de atuação", "A liderança compreende seu papel sem assumir função clínica ou agir de forma improvisada."],
      ["Possíveis formatos", "Workshop, jornada de desenvolvimento, oficina prática ou acompanhamento conectado aos desafios da organização."]
    ]
  },
  "mentoria-pj": {
    kicker: "Desenvolvimento de lideranças",
    title: "Mentorias para lideranças",
    lead: "Acompanhamento individual ou em pequenos grupos, conectado aos desafios reais da organização.",
    boxes: [["Objetivo", "Sustentar a aplicação do desenvolvimento e apoiar desafios específicos da função."], ["Formato", "Ciclos definidos por objetivo, com preservação da confidencialidade individual."]]
  },
  nr1: {
    kicker: "Saúde mental e cultura",
    title: "NR-1 e riscos psicossociais",
    lead: "Mapeamento, aplicação de instrumentos, análise dos fatores de risco e apoio à construção do plano de ação.",
    boxes: [["Como atuamos", "Levantamento, escuta, análise psicossocial e organizacional, priorização e recomendações."], ["Integração", "A atuação pode ser articulada com SST, SESMT ou parceiros técnicos responsáveis pelos documentos e processos de segurança do trabalho."]]
  },
  rodas: {
    kicker: "Saúde mental e cultura",
    title: "Rodas de conversa",
    lead: "Espaços mediados de diálogo, aprendizagem e reflexão, construídos a partir das necessidades e do momento da organização.",
    boxes: [
      ["Para quem é indicado", "Times, lideranças, grupos internos e organizações que desejam fortalecer a comunicação, as relações e o cuidado com a saúde mental no trabalho."],
      ["Como pode funcionar", "Encontros únicos ou ciclos recorrentes para sensibilização, diálogo e aplicação prática com times e lideranças."],
      ["Possíveis formatos", "Encontro único; ciclo mensal; projeto-piloto; programa contínuo; formato presencial ou on-line."],
      ["Possíveis temas", "Saúde mental no cotidiano, sobrecarga, comunicação não violenta, escuta, conversas difíceis, estresse, pertencimento e segurança psicológica."],
      ["Estrutura do encontro", "Acolhimento e acordos; conteúdo ou situação disparadora; conversa mediada; síntese e recurso aplicável ao cotidiano."],
      ["Possíveis entregas", "Alinhamento prévio, planejamento dos temas, condução profissional, materiais de apoio, avaliação breve e síntese qualitativa do ciclo."],
      ["Limites da proposta", "A participação é estimulada sem obrigação de exposição pessoal. A roda tem finalidade educativa e preventiva e não substitui acompanhamento psicológico."]
    ],
    product: {
      title: "Ciclos de Diálogo Belbi",
      text: "Programa recorrente de encontros mediados para fortalecer saúde mental, comunicação e relações no trabalho."
    }
  },
  palestras: {
    kicker: "Saúde mental e cultura",
    title: "Palestras e campanhas",
    lead: "Conteúdos personalizados para SIPAT, Janeiro Branco, Setembro Amarelo e outras necessidades da organização.",
    boxes: [["Diferencial", "Os temas são alinhados ao contexto da empresa e podem incluir materiais e recomendações de continuidade."], ["Formatos", "Palestra, campanha, encontro temático ou roda de conversa, on-line ou presencial."]]
  }
};

const solutionsBackdrop = document.getElementById('solutionsModalBackdrop');
if (solutionsBackdrop) {
  const solutionsModalTitle = document.getElementById('solutionsModalTitle');
  const solutionsModalKicker = document.getElementById('solutionsModalKicker');
  const solutionsModalBody = document.getElementById('solutionsModalBody');
  const solutionsModalClose = document.getElementById('solutionsModalClose');
  let solutionsLastFocused = null;

  function renderSolutionsModal(key) {
    const content = solutionsContent[key];
    if (!content) return;
    solutionsLastFocused = document.activeElement;
    solutionsModalKicker.textContent = content.kicker || 'Solução Belbi';
    solutionsModalTitle.textContent = content.title;

    const boxes = (content.boxes || []).map(([title, text], index) => `
      <div class="solutions-modal__detail-box ${index === (content.boxes || []).length - 1 && (content.boxes || []).length % 2 === 1 ? 'solutions-modal__detail-box--full' : ''}">
        <h4>${title}</h4>
        <p>${text}</p>
      </div>
    `).join('');

    const modules = (content.modules || []).map(([number, title, subtitle]) => `
      <div class="solutions-modal__module">
        <span class="solutions-modal__module-number">${number}</span>
        <span class="solutions-modal__module-copy">
          <strong>${title}</strong>
          <small>${subtitle}</small>
        </span>
      </div>
    `).join('');

    solutionsModalBody.innerHTML = `
      <p class="solutions-modal__lead">${content.lead}</p>
      ${content.personalization ? `
        <aside class="solutions-modal__personalization">
          <span class="solutions-modal__personalization-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9L12 3Z"/></svg>
          </span>
          <span>
            <strong>Conteúdo personalizado</strong>
            <p>${content.personalization}</p>
          </span>
        </aside>
      ` : ''}
      ${modules ? `
        <section class="solutions-modal__modules">
          <div class="solutions-modal__modules-header">
            <h4>Temas abordados na jornada</h4>
            <span>Estrutura de referência</span>
          </div>
          <div class="solutions-modal__modules-grid">${modules}</div>
        </section>
      ` : ''}
      <div class="solutions-modal__detail-grid">${boxes}</div>
      ${content.product ? `
        <div class="solutions-modal__product">
          <small>Produto comercial Belbi</small>
          <h4>${content.product.title}</h4>
          <p>${content.product.text}</p>
        </div>
      ` : ''}
      <div class="solutions-modal__actions">
        <a class="btn btn--green" href="https://wa.me/5511979683347?text=Ol%C3%A1%21%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Belbi." onclick="hideSolutionsModal(); return gtag_report_conversion('https://wa.me/5511979683347?text=Ol%C3%A1%21%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Belbi.');" target="_blank" rel="noopener">Conversar sobre esta solução</a>
      </div>
    `;

    solutionsBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => solutionsModalClose.focus(), 50);
  }

  function hideSolutionsModal() {
    solutionsBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (solutionsLastFocused) solutionsLastFocused.focus();
  }

  window.hideSolutionsModal = hideSolutionsModal;

  document.querySelectorAll('[data-service]').forEach(button => {
    button.addEventListener('click', () => renderSolutionsModal(button.dataset.service));
  });

  solutionsModalClose.addEventListener('click', hideSolutionsModal);
  solutionsBackdrop.addEventListener('click', event => {
    if (event.target === solutionsBackdrop) hideSolutionsModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && solutionsBackdrop.classList.contains('open')) hideSolutionsModal();
  });
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
