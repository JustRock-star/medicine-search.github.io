// Замени этот API-ключ на свой, который ты получил
const API_KEY = '';

// --- Language support (i18n) ---
const TRANSLATIONS = {
    'ru': {
        title: 'Поиск информации о препаратах',
        subtitle: 'Быстрый поиск по проверённым медицинским источникам',
        search: 'Поиск',
        buy: 'Где купить',
        doses: 'Дозировки',
        map: 'Карта аптек',
        marketplaces: 'Маркетплейсы',
        search_placeholder: 'Например: парацетамол',
        search_btn: 'Поиск',
        country_label: 'Страна',
        drug_placeholder: 'Название препарата',
        city_placeholder: 'Город (опционально)',
        buy_btn: 'Где купить',
        doses_title: 'Таблица дозировок',
        doses_desc: 'Выберите препарат и возрастную группу, чтобы посмотреть примерные дозировки.',
        age_placeholder: 'Ваш возраст (лет)',
        show_btn: 'Показать',
        map_title: 'Карта аптек',
        map_desc: 'Найдите аптеки рядом или по названию города.',
        map_nearby_btn: 'Найти поблизости',
        map_locate_btn: 'Найти по местоположению',
        market_title: 'Маркетплейсы',
        market_desc: 'Выберите маркетплейс или введите свой — поиск откроется в новом окне.',
        market_search_placeholder: 'Что искать (например: пинцеты)',
        market_select_placeholder: 'Выберите маркетплейс',
        market_custom_placeholder: 'Или введите адрес/название магазина (опционально)',
        market_search_btn: 'Искать в маркетплейсе'
    },
    'en': {
        title: 'Medicine Information Search',
        subtitle: 'Quick search through verified medical sources',
        search: 'Search',
        buy: 'Where to Buy',
        doses: 'Dosages',
        map: 'Pharmacy Map',
        marketplaces: 'Marketplaces',
        search_placeholder: 'E.g.: paracetamol',
        search_btn: 'Search',
        country_label: 'Country',
        drug_placeholder: 'Drug name',
        city_placeholder: 'City (optional)',
        buy_btn: 'Where to Buy',
        doses_title: 'Dosage Table',
        doses_desc: 'Select a drug and age group to see approximate dosages.',
        age_placeholder: 'Your age (years)',
        show_btn: 'Show',
        map_title: 'Pharmacy Map',
        map_desc: 'Find pharmacies nearby or by city name.',
        map_nearby_btn: 'Find Nearby',
        map_locate_btn: 'Use My Location',
        market_title: 'Marketplaces',
        market_desc: 'Select a marketplace or enter your own — search opens in a new window.',
        market_search_placeholder: 'What to search (e.g.: tweezers)',
        market_select_placeholder: 'Select marketplace',
        market_custom_placeholder: 'Or enter site/store name (optional)',
        market_search_btn: 'Search Marketplace'
    },
    'hy': {
        title: 'Դեղերի տեղեկատվության որոնում',
        subtitle: 'Արագ որոնում ստուգված բժշկական աղբյուրներում',
        search: 'Որոնել',
        buy: 'Որտեղ գնել',
        doses: 'Դոզավորում',
        map: 'Դեղատոմսերի քարտեզ',
        marketplaces: 'Շուկայական գործակալներ',
        search_placeholder: 'Օրինակ՝ պարացետամոլ',
        search_btn: 'Որոնել',
        country_label: 'Երկիր',
        drug_placeholder: 'Դեղի անունը',
        city_placeholder: 'Քաղաք (ընտրական)',
        buy_btn: 'Որտեղ գնել',
        doses_title: 'Դոզավորման աղյուսակ',
        doses_desc: 'Ընտրեք դեղ և տարիքային խումբ՝ մոտավոր դոզավորումները տեսնելու համար։',
        age_placeholder: 'Ձեր տարիքը (տարի)',
        show_btn: 'Ցուցադրել',
        map_title: 'Դեղատոմսերի քարտեզ',
        map_desc: 'Գտեք դեղատոմսեր մոտակայքում կամ քաղ論նի անունով։',
        map_nearby_btn: 'Գտեք մոտակայքում',
        map_locate_btn: 'Օգտագործել իմ տեղանիշը',
        market_title: 'Շուկայական գործակալներ',
        market_desc: 'Ընտրեք շուկայական գործակալ կամ մուտքագրեք ձերը — որոնումը բացվում է նոր պատուհանում։',
        market_search_placeholder: 'Ինչ փնտրել (օրինակ՝ շարակցիչներ)',
        market_select_placeholder: 'Ընտրեք շուկայական գործակալ',
        market_custom_placeholder: 'Կամ մուտքագրեք կայքի/խանութի հասցե (ընտրական)',
        market_search_btn: 'Որոնել շուկայական գործակալում'
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'ru';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update all translatable elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if(TRANSLATIONS[lang][key]) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = TRANSLATIONS[lang][key];
            } else if(el.tagName === 'OPTION') {
                el.innerText = TRANSLATIONS[lang][key];
            } else {
                el.innerText = TRANSLATIONS[lang][key];
            }
        }
    });
}

// Initialize language on load
window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
});

document.getElementById('searchButton').addEventListener('click', searchMedicine);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMedicine();
    }
});

// Countries (name in Russian, ccTLD)
const COUNTRIES = [
    { name: 'Россия', code: 'ru' },
    { name: 'Армения', code: 'am' },
    { name: 'Соединённые Штаты', code: 'us' },
    { name: 'Великобритания', code: 'uk' },
    { name: 'Германия', code: 'de' },
    { name: 'Франция', code: 'fr' },
    { name: 'Испания', code: 'es' },
    { name: 'Италия', code: 'it' },
    { name: 'Канада', code: 'ca' },
    { name: 'Австралия', code: 'au' },
    { name: 'Польша', code: 'pl' },
    { name: 'Украина', code: 'ua' },
    { name: 'Беларусь', code: 'by' },
    { name: 'Казахстан', code: 'kz' },
    { name: 'Узбекистан', code: 'uz' },
    { name: 'Грузия', code: 'ge' },
    { name: 'Турция', code: 'tr' },
    { name: 'Индия', code: 'in' },
    { name: 'Китай', code: 'cn' },
    { name: 'Япония', code: 'jp' },
    { name: 'Швеция', code: 'se' },
    { name: 'Норвегия', code: 'no' },
    { name: 'Финляндия', code: 'fi' },
    { name: 'Нидерланды', code: 'nl' },
    { name: 'Бельгия', code: 'be' },
    { name: 'Швейцария', code: 'ch' },
    { name: 'Австрия', code: 'at' },
    { name: 'Португалия', code: 'pt' },
    { name: 'Румыния', code: 'ro' },
    { name: 'Чехия', code: 'cz' },
    { name: 'Словакия', code: 'sk' },
    { name: 'Венгрия', code: 'hu' },
    { name: 'Болгария', code: 'bg' },
    { name: 'Сербия', code: 'rs' },
    { name: 'Хорватия', code: 'hr' },
    { name: 'Босния и Герцеговина', code: 'ba' },
    { name: 'Словения', code: 'si' },
    { name: 'Греция', code: 'gr' },
    { name: 'Литва', code: 'lt' },
    { name: 'Латвия', code: 'lv' },
    { name: 'Эстония', code: 'ee' },
    { name: 'Израиль', code: 'il' },
    { name: 'Марокко', code: 'ma' },
    { name: 'Южная Африка', code: 'za' },
    { name: 'Египет', code: 'eg' },
    { name: 'Саудовская Аравия', code: 'sa' },
    { name: 'Объединённые Арабские Эмираты', code: 'ae' },
    { name: 'Сингапур', code: 'sg' },
    { name: 'Малайзия', code: 'my' },
    { name: 'Таиланд', code: 'th' },
    { name: 'Вьетнам', code: 'vn' },
    { name: 'Индонезия', code: 'id' }
    // Можно дополнить все страны при необходимости
];

function populateCountries() {
    const sel = document.getElementById('countrySelect');
    sel.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.innerText = 'Выберите страну';
    sel.appendChild(placeholder);
    COUNTRIES.forEach(c => {
        const o = document.createElement('option');
        o.value = c.code;
        o.innerText = c.name;
        sel.appendChild(o);
    });
}

// Набор известных аптек по странам — можно расширять
const TRUSTED_PHARMS = {
    'am': ['alfapharm.am'],
    'ru': ['apteka.ru','36on.ru','eapteka.ru','apteka5.ru'],
    'us': ['walmart.com','cvs.com','walgreens.com'],
    'uk': ['boots.com','pharmacy2u.co.uk'],
    'de': ['docmorris.de','shop-apotheke.de'],
    'fr': ['doctipharma.fr'],
    'ca': ['shoppersdrugmart.ca','well.ca']
};

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    const sel = document.getElementById('countrySelect');
    // попытка выбрать Россию по умолчанию, если есть
    if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === 'ru') { sel.selectedIndex = i; break; }
        }
    }

    const buyBtn = document.getElementById('buyButton');
    if (buyBtn) buyBtn.addEventListener('click', () => {
        const buyField = document.getElementById('buyQuery');
        const vendor = document.getElementById('vendorSelect');
        const vendorVal = vendor ? vendor.value : '';
        const query = buyField && buyField.value.trim() ? buyField.value.trim() : (document.getElementById('searchInput').value.trim());
        const city = document.getElementById('cityInput').value.trim();
        if (!query) { setResultsMeta('Введите название препарата или товара для поиска.', true); return; }

        const fullQuery = query + (city ? ' ' + city : '');
        let url = '';
        switch((vendorVal||'').toLowerCase()){
            case 'wildberries': url = 'https://www.wildberries.ru/catalog/0/search.aspx?search=' + encodeURIComponent(fullQuery); break;
            case 'ozon': url = 'https://www.ozon.ru/search/?text=' + encodeURIComponent(fullQuery); break;
            case 'aliexpress': url = 'https://www.aliexpress.com/wholesale?SearchText=' + encodeURIComponent(fullQuery); break;
            case 'pinduoduo': url = 'https://mobile.yangkeduo.com/search_result.html?search_key=' + encodeURIComponent(fullQuery); break;
            case 'yandex': url = 'https://market.yandex.ru/search?text=' + encodeURIComponent(fullQuery); break;
            case 'ebay': url = 'https://www.ebay.com/sch/i.html?_nkw=' + encodeURIComponent(fullQuery); break;
            default: url = 'https://www.google.com/search?q=' + encodeURIComponent(fullQuery); break;
        }
        window.open(url, '_blank');
    });
});



async function searchPharmacies(query, cc, countryName) {
    if (!query) { setResultsMeta('Введите название препарата для поиска аптек.', true); return; }
    if (!cc) { setResultsMeta('Выберите страну.', true); return; }

    const city = document.getElementById('cityInput').value.trim();
    setResultsMeta('Ищем аптеки в ' + (city ? city + ', ' : '') + (countryName || cc) + '...');
    document.getElementById('results').innerHTML = '<div class="loading">Ищем аптеки и предложения...</div>';

    const found = [];

    // сначала по известным доменам для страны
    const domains = TRUSTED_PHARMS[cc] || [];
    for (const d of domains) {
        const c = await searchSiteWithDuckDuckGo((city ? city + ' ' : '') + query, d);
        if (c && c.link) found.push({ title: d, snippet: c.snippet || '', link: c.link, source: d });
    }

    // шаблоны запросов на разных языках
    const patterns = [
        `${query} купить`,
        `${query} купить аптека`,
        `${query} заказать`,
        `${query} цена`,
        `${query} купить онлайн`,
        `${query} where to buy`,
        `${query} buy online`,
        `${query} pharmacy`
    ];

    // включаем город в запросы, если указан
    const queries = [];
    patterns.forEach(p => {
        queries.push((city ? city + ' ' : '') + p + ' site:.' + cc);
        queries.push((city ? city + ' ' : '') + p + ' ' + countryName);
    });

    for (const q of queries) {
        const items = await performDDGSearch(q);
        items.forEach(i => {
            if (i.link && i.snippet) found.push({ title: i.title || query, snippet: i.snippet, link: i.link, source: i.source || 'DuckDuckGo' });
        });
        if (found.length >= 20) break;
    }

    // попытка прямого поиска по имени бренда + домен страны
    const brandDomain = (query.toLowerCase().replace(/[^a-z0-9]/g,'')) + '.' + cc;
    try {
        const direct = await searchSiteWithDuckDuckGo(query, brandDomain);
        if (direct && direct.link) found.unshift({ title: brandDomain, snippet: direct.snippet || '', link: direct.link, source: brandDomain });
    } catch (e) {}

    // dedupe и сортировка: приоритезируем наличие ключевых слов "куп" или домен из TRUSTED_PHARMS
    const seen = new Set();
    const unique = [];
    for (const f of found) {
        const key = (f.link || '').split('#')[0];
        if (!key || seen.has(key)) continue;
        seen.add(key);
        // score: more weight for trusted domains and presence of buy keywords
        let score = 0;
        for (const d of domains) if (f.link && f.link.includes(d)) score += 3;
        if (/куп|buy|order|заказ/i.test((f.snippet || '') + ' ' + (f.title || ''))) score += 2;
        if (/аптека|pharmacy|drugstore/i.test((f.snippet || '') + ' ' + (f.title || ''))) score += 1;
        unique.push({...f, score});
    }

    unique.sort((a,b)=> (b.score||0)-(a.score||0));

    if (unique.length === 0) {
        // если ничего нет — предложить Google (быстрый фолбек)
        document.getElementById('results').innerHTML = '';
        document.getElementById('pharmacies').innerHTML = '';
        const p = document.createElement('div');
        p.classList.add('result');
        p.innerHTML = '<strong>Ничего не найдено.</strong> Попробуйте открыть поиск в Google:';
        const btn = document.createElement('a');
        btn.href = 'https://www.google.com/search?q=' + encodeURIComponent(query + ' ' + (city? city + ' ':'') + countryName + ' купить');
        btn.target = '_blank';
        btn.classList.add('btn-link');
        btn.innerText = 'Открыть поиск в Google';
        p.appendChild(document.createElement('br'));
        p.appendChild(btn);
        document.getElementById('pharmacies').appendChild(p);
        setResultsMeta('Ничего не найдено — откройте поиск в Google.', true);
        return;
    }

    // отображаем до 12 результатов
    displayPharmacies(unique.slice(0,12), query, countryName);
    setResultsMeta('Найдено ' + unique.length + ' предложений.');
}

function displayPharmacies(items, query, countryName) {
    const ph = document.getElementById('pharmacies');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    ph.innerHTML = '';

    if (!items || items.length === 0) {
        ph.innerHTML = '<div class="result">Не найдено предложений. Попробуйте другой город или откройте поиск вручную.</div>';
        return;
    }

    items.forEach(it => {
        const card = document.createElement('div');
        card.classList.add('pharmacy-card', 'fade-in');

        const title = document.createElement('div');
        title.classList.add('pharm-title');
        try { title.innerText = new URL(it.link).hostname; } catch (e) { title.innerText = it.title; }

        const snippet = document.createElement('div');
        snippet.classList.add('pharm-snippet');
        snippet.innerText = it.snippet;

        const link = document.createElement('a');
        link.href = it.link;
        link.target = '_blank';
        link.innerText = 'Открыть магазин';
        link.classList.add('btn-link');

        card.appendChild(title);
        card.appendChild(snippet);
        const actions = document.createElement('div'); actions.className='pharmacy-actions';
        actions.appendChild(link);
        card.appendChild(actions);
        ph.appendChild(card);
    });
}

// Набор шаблонных слов, по которым проверяем, является ли текст медицинским
const MEDICAL_KEYWORDS = ['лекар', 'препарат', 'инструкц', 'анальгет', 'антипирет', 'дозировк', 'примен', 'фармак', 'активн', 'отпускается', 'показани', 'побочн', 'показани', 'фармакод', 'фармакокин'];

function isMedicalText(text) {
    if (!text) return false;
    const t = text.toLowerCase();
    return MEDICAL_KEYWORDS.some(k => t.includes(k));
}

function setResultsMeta(text, isError = false) {
    const meta = document.getElementById('resultsMeta');
    meta.style.display = text ? 'block' : 'none';
    meta.innerText = text || '';
    meta.style.color = isError ? '#b24b4b' : '#6b6b5b';
}

function keywordScore(text) {
    if (!text) return 0;
    const t = text.toLowerCase();
    let score = 0;
    MEDICAL_KEYWORDS.forEach(k => {
        const re = new RegExp(k, 'g');
        const m = t.match(re);
        if (m) score += m.length;
    });
    return score;
}

// Попытка получить точную страницу по названию в указанной вики (lang = 'ru' или 'en')
async function tryWikipediaExact(lang, title) {
    try {
        const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const resp = await fetch(url);
        if (!resp.ok) return null;
        const json = await resp.json();
        if (json && json.extract) {
            return { title: json.title, extract: json.extract, url: json.content_urls ? (json.content_urls.desktop && json.content_urls.desktop.page) : (`https://${lang}.wikipedia.org/wiki/${encodeURIComponent(json.title)}`) };
        }
    } catch (e) {
        // ignore
    }
    return null;
}

function normalizeText(t) {
    return (t || '').toString().toLowerCase().replace(/[^a-zа-я0-9]+/g, ' ').trim();
}

function appearsGeneric(text) {
    if (!text) return false;
    const t = text.toLowerCase();
    return /действующ|активн|кристалл|вещество|формула|порошок|химич/i.test(t) || keywordScore(text) < 1;
}

// Попробуем найти брендовые/товарные страницы (с приоритетом en.wiki и коммерческих страниц)
async function findBrandPage(query) {
    const candidates = [];

    // 1) Try exact ru and en titles
    const exactRu = await tryWikipediaExact('ru', query);
    if (exactRu && !appearsGeneric(exactRu.extract)) return {...exactRu, source: 'Wikipedia (ru)'};

    // try transliteration by adding common english variants (simple heuristic)
    const engVariant = query.replace(/[^A-Za-z0-9]/g, '');
    if (engVariant && engVariant.length > 2) {
        const exactEn = await tryWikipediaExact('en', engVariant);
        if (exactEn) return {...exactEn, source: 'Wikipedia (en)'};
    }

    // 2) Targeted search on en.wikipedia via DuckDuckGo
    try {
        const q1 = 'site:en.wikipedia.org "' + query + '" OR ' + query + ' Nurofen';
        const ddg1 = await performDDGSearch(q1);
        for (const d of ddg1) {
            if (d.link && /nurofen|brand|product|ibuprofen/i.test(d.link + ' ' + d.title)) {
                return { ...d, source: (d.link && d.link.includes('en.wikipedia.org')) ? 'Wikipedia (en)' : 'DuckDuckGo' };
            }
        }

        // 3) broader brand search
        const q2 = query + ' торговая марка OR бренд OR Nurofen OR "' + query + '"';
        const ddg2 = await performDDGSearch(q2);
        for (const d of ddg2) {
            if (d.link && /(nurofen|brand|product|site:en.wikipedia.org)/i.test(d.link + ' ' + d.title)) {
                return { ...d, source: (d.link && d.link.includes('en.wikipedia.org')) ? 'Wikipedia (en)' : 'DuckDuckGo' };
            }
        }

        // 4) try trusted sites for brand mentions
        const trusted = ['drugs.com','medlineplus.gov','drugbank.ca','rxlist.com'];
        for (const s of trusted) {
            const c = await searchSiteWithDuckDuckGo(query, s);
            if (c && /(nurofen|brand|торгов|marketed|product)/i.test((c.snippet || '') + ' ' + c.link)) return { ...c, source: s };
        }
    } catch (e) { /* ignore */ }

    return null;
}

async function searchMedicine() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div class="loading">Ищем проверённую медицинскую информацию...</div>';
    setResultsMeta('Ищем в Wikipedia и медицинских ресурсах...');

    try {
        const found = [];

        // 1) Wikipedia strong match
        const wikiVariants = [query + ' препарат', query + ' инструкция', query + ' лекарство', query];
        for (const v of wikiVariants) {
            const w = await tryWikipedia(v);
            if (w) {
                const sc = keywordScore(w.extract) + 2; // wikipedia boost
                found.push({ title: w.title, snippet: w.extract, link: w.url, source: 'Wikipedia', score: sc });
            }
        }

        // 2) site-specific trusted sites
        const trustedSites = ['drugs.com', 'medlineplus.gov', 'rxlist.com', 'drugbank.ca', 'vidal.ru'];
        for (const site of trustedSites) {
            const c = await searchSiteWithDuckDuckGo(query, site);
            if (c) {
                const sc = keywordScore(c.snippet) + 1;
                found.push({ title: site, snippet: c.snippet, link: c.link, source: site, score: sc });
            }
        }

        // 3) broader DuckDuckGo search for additional candidates
        const ddgCandidates = await performDDGSearch(query);
        ddgCandidates.forEach(c => {
            const sc = keywordScore(c.snippet);
            found.push({ title: c.title || query, snippet: c.snippet, link: c.link, source: c.source || 'DuckDuckGo', score: sc });
        });

        // Deduplicate by link and sort by score
        const unique = [];
        const seen = new Set();
        found.sort((a,b)=>b.score-a.score);
        for (const it of found) {
            if (!it.link) continue;
            const key = it.link.split('#')[0];
            if (seen.has(key)) continue;
            seen.add(key);
            unique.push(it);
            if (unique.length >= 4) break;
        }

        if (unique.length > 0) {
            // Если верхний результат выглядит как описание вещества, но запрос — бренд, ищем бренд-страницу
            const top = unique[0];
            const normalizedQuery = normalizeText(query);
            const topTitle = normalizeText(top.title || '');
            if (appearsGeneric(top.snippet) && topTitle.indexOf(normalizedQuery) === -1) {
                const brand = await findBrandPage(query);
                if (brand && brand.link) {
                    unique.unshift({ title: brand.title || query, snippet: brand.snippet || '', link: brand.link, source: brand.source || 'Brand', score: 10 });
                }
            }

            displayResultsList(unique, query);
            setResultsMeta('Найдены ' + unique.length + ' источника(ов). Проверьте сниппеты и откройте оригинал.');
            return;
        }

        // Fallback
        setResultsMeta('Не найдено достоверных медицинских описаний. См. ссылки ниже.', true);
        resultsDiv.innerHTML = '';
        displayFallbackLinks(query);

    } catch (e) {
        console.error('Поиск упал:', e);
        setResultsMeta('Ошибка при поиске — повторите позже.', true);
        document.getElementById('results').innerHTML = '';
        displayFallbackLinks(query);
    }
}

async function performDDGSearch(query) {
    try {
        const q = query + ' инструкция препарат';
        const ddgUrl = 'https://api.duckduckgo.com/?q=' + encodeURIComponent(q) + '&format=json&no_html=1&skip_disambig=1';
        const resp = await fetch(ddgUrl);
        const ddg = await resp.json();
        const out = [];
        if (ddg.AbstractText && ddg.AbstractText.trim()) out.push({ title: query, snippet: ddg.AbstractText, link: ddg.AbstractURL || '', source: 'DuckDuckGo' });
        if (ddg.Results) ddg.Results.forEach(r => out.push({ title: r.Text || r.Result || query, snippet: (r.Text || r.Result || '').replace(/<[^>]+>/g,''), link: r.FirstURL || r.Result || '', source: 'DuckDuckGo' }));
        if (ddg.RelatedTopics) ddg.RelatedTopics.forEach(t => { const txt = (t.Text || (t.Topics && t.Topics[0] && t.Topics[0].Text)) || ''; if (txt) out.push({ title: txt.split(' - ')[0], snippet: txt.replace(/<[^>]+>/g,''), link: t.FirstURL || '', source: 'DuckDuckGo' }); });
        return out;
    } catch (e) { return []; }
}

function confidenceClass(score) {
    if (score >= 3) return ['Высокая', 'conf-high'];
    if (score >= 1) return ['Средняя', 'conf-med'];
    return ['Низкая', 'conf-low'];
}

function displayResultsList(items, query) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    items.forEach(it => {
        const card = document.createElement('div');
        card.classList.add('result', 'fade-in');

        const h = document.createElement('div');
        const title = document.createElement('h2'); title.innerText = it.title || query;
        const src = document.createElement('span'); src.classList.add('source-label'); src.innerText = it.source;
        h.appendChild(title); h.appendChild(src);

        const [label, cls] = confidenceClass(it.score);
        const conf = document.createElement('span'); conf.classList.add('confidence', cls); conf.innerText = label;
        h.appendChild(conf);

        const sn = document.createElement('p'); sn.innerText = it.snippet || '';
        const link = document.createElement('a'); link.href = it.link || ('https://www.google.com/search?q=' + encodeURIComponent(query + ' препарат инструкция')); link.target = '_blank'; link.classList.add('btn-link'); link.innerText = 'Открыть источник';

        card.appendChild(h); card.appendChild(sn); card.appendChild(link);
        resultsDiv.appendChild(card);
    });
}

async function tryWikipedia(searchQuery) {
    try {
        const wikiSearchUrl = 'https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(searchQuery) + '&format=json&origin=*';
        const wikiSearchResp = await fetch(wikiSearchUrl);
        const wikiSearch = await wikiSearchResp.json();

        if (wikiSearch && wikiSearch.query && wikiSearch.query.search && wikiSearch.query.search.length > 0) {
            const title = wikiSearch.query.search[0].title;
            const summaryUrl = 'https://ru.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
            const summaryResp = await fetch(summaryUrl);
            const summary = await summaryResp.json();
            if (summary && summary.extract) {
                return { title, extract: summary.extract, url: summary.content_urls ? (summary.content_urls.desktop && summary.content_urls.desktop.page) : ('https://ru.wikipedia.org/wiki/' + encodeURIComponent(title)) };
            }
        }
    } catch (e) {
        console.warn('Wikipedia lookup failed:', e);
    }
    return null;
}

async function searchSiteWithDuckDuckGo(query, site) {
    try {
        const q = 'site:' + site + ' ' + query + ' инструкция OR препарат';
        const ddgUrl = 'https://api.duckduckgo.com/?q=' + encodeURIComponent(q) + '&format=json&no_html=1&skip_disambig=1';
        const ddgResp = await fetch(ddgUrl);
        const ddg = await ddgResp.json();
        if (!ddg) return null;

        // Приоритет: AbstractText, затем Results, затем RelatedTopics
        if (ddg.AbstractText && ddg.AbstractText.trim()) {
            return { snippet: ddg.AbstractText, link: ddg.AbstractURL || ('https://' + site) };
        }

        const candidates = [];
        if (ddg.Results) candidates.push(...ddg.Results);
        if (ddg.RelatedTopics) candidates.push(...ddg.RelatedTopics.map(t => (t.Text ? t : (t.Topics ? t.Topics[0] : null))).filter(Boolean));

        for (const c of candidates) {
            const text = (c.Text || c.Result || '') + '';
            if (text && text.trim()) {
                const snippet = text.replace(/<[^>]+>/g, '');
                const link = c.FirstURL || c.Result || ('https://' + site);
                return { snippet, link };
            }
        }

    } catch (e) {
        console.warn('DDG site search failed for', site, e);
    }
    return null;
}

async function gatherMedicalSources(query) {
    const sources = [];
    const wiki = await tryWikipedia(query);
    if (wiki) sources.push({ title: 'Wikipedia', snippet: wiki.extract, link: wiki.url });

    const trustedSites = ['drugs.com', 'medlineplus.gov', 'rxlist.com', 'drugbank.ca'];
    for (const site of trustedSites) {
        const c = await searchSiteWithDuckDuckGo(query, site);
        if (c && isMedicalText(c.snippet)) {
            sources.push({ title: site, snippet: c.snippet, link: c.link });
        }
    }
    return sources;
}

function displayResult(text, query, source = 'Источник', link = 'https://www.google.com/search?q=' + encodeURIComponent(query + ' препарат инструкция'), isMedical = false) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const resultElement = document.createElement('div');
    resultElement.classList.add('result', 'fade-in');

    const header = document.createElement('div');
    header.classList.add('result-header');

    const title = document.createElement('h2');
    title.innerText = query;

    const srcLabel = document.createElement('span');
    srcLabel.classList.add('source-label');
    srcLabel.innerText = source;

    header.appendChild(title);
    header.appendChild(srcLabel);

    if (isMedical) {
        const badge = document.createElement('span');
        badge.classList.add('badge-medical');
        badge.innerText = 'МЕДИЦИНСКОЕ';
        header.appendChild(badge);
    }

    const snippet = document.createElement('p');
    snippet.innerText = text;

    const moreLink = document.createElement('a');
    moreLink.href = link;
    moreLink.target = '_blank';
    moreLink.innerText = 'Показать подробности';
    moreLink.classList.add('btn-link');

    resultElement.appendChild(header);
    resultElement.appendChild(snippet);
    resultElement.appendChild(moreLink);

    resultsDiv.appendChild(resultElement);
}

function displayAdditionalSources(items) {
    if (!items || items.length === 0) return;
    const resultsDiv = document.getElementById('results');

    const wrapper = document.createElement('div');
    wrapper.classList.add('additional-sources');

    items.slice(0, 4).forEach(it => {
        const card = document.createElement('div');
        card.classList.add('source-card', 'fade-in');

        const title = document.createElement('div');
        title.classList.add('source-title');
        title.innerText = it.title;

        const snippet = document.createElement('div');
        snippet.classList.add('source-snippet');
        snippet.innerText = it.snippet;

        const link = document.createElement('a');
        link.href = it.link;
        link.target = '_blank';
        link.innerText = 'Открыть источник';
        link.classList.add('btn-link');

        card.appendChild(title);
        card.appendChild(snippet);
        card.appendChild(link);
        wrapper.appendChild(card);
    });

    resultsDiv.appendChild(wrapper);
}

function displayFallbackLinks(query) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('result');

    const title = document.createElement('h2');
    title.innerText = 'Не найдено проверённого медицинского описания';

    const msg = document.createElement('p');
    msg.innerText = 'Попробуйте открыть поиск вручную в одном из следующих проверенных источников:';

    const list = document.createElement('div');
    list.classList.add('links');

    const links = [
        { name: 'Wikipedia (ru)', url: 'https://ru.wikipedia.org/w/index.php?search=' + encodeURIComponent(query) },
        { name: 'drugs.com', url: 'https://www.drugs.com/search.php?searchterm=' + encodeURIComponent(query) },
        { name: 'MedlinePlus (en)', url: 'https://medlineplus.gov/search/?query=' + encodeURIComponent(query) },
        { name: 'DrugBank', url: 'https://go.drugbank.com/unearth/q?searcher=drugs&query=' + encodeURIComponent(query) }
    ];

    links.forEach(l => {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = '_blank';
        a.innerText = l.name;
        list.appendChild(a);
    });

    card.appendChild(title);
    card.appendChild(msg);
    card.appendChild(list);
    resultsDiv.appendChild(card);
}

// favorites removed per user request

// --- UI: tabs, dosages and map integration ---
(function(){
    function switchTab(id){
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.target===id));
        document.querySelectorAll('.tab-pane').forEach(p=>p.classList.toggle('active', p.id===id));
    }

    document.querySelectorAll('.tab-btn').forEach(b=>{
        b.addEventListener('click', ()=> switchTab(b.dataset.target));
    });

    // Dosages: simple heuristic/static examples (age entered by user)
    const DOSE_EXAMPLES = {
        'парацетамол': {
            child: '<table style="width:100%;border-collapse:collapse;"><tr><th style="text-align:left;padding:6px;border-bottom:1px solid #e6e2d6">Возраст</th><th style="text-align:left;padding:6px;border-bottom:1px solid #e6e2d6">Доза</th></tr><tr><td style="padding:6px">0-3 мес</td><td style="padding:6px">не назначать без врача</td></tr><tr><td style="padding:6px">3 мес - 12 лет</td><td style="padding:6px">10-15 мг/кг каждые 4-6 ч, макс 60 мг/кг/сут</td></tr></table>',
            adult: '<div style="padding:6px">Взрослые: 500–1000 мг каждые 4–6 ч при необходимости, максимум 4 г/сут. Передозировка опасна — следуйте инструкции.</div>',
            elder: '<div style="padding:6px">Пожилые: обычно дозы как у взрослых, но рекомендуется начинать с минимальной эффективной дозы и проконсультироваться с врачом при хронических заболеваниях.</div>'
        }
    };

    const doseBtn = document.getElementById('doseButton');
    if(doseBtn){
        doseBtn.addEventListener('click', ()=>{
            const q = document.getElementById('doseQuery').value.trim();
            const ageStr = document.getElementById('ageInput').value.trim();
            const out = document.getElementById('doseResult');
            if(!q){ out.innerHTML = '<div class="result">Введите название препарата.</div>'; return; }

            // Build a Google search for dosage by age, e.g. "дозировка аспирин в 7 лет"
            let searchQ = 'дозировка ' + q;
            if(ageStr){
                // try to keep age as entered
                searchQ += ' в ' + ageStr + ' лет';
            }
            // open search in new tab
            window.open('https://www.google.com/search?q=' + encodeURIComponent(searchQ), '_blank');
            out.innerHTML = '<div class="result">Открыт поиск: ' + escapeHtml(searchQ) + '</div>';
        });
    }

    // Leaflet map setup
    let map, markersLayer;
    function ensureMap(){
        if(map) return;
        const L_LINK_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        const L_LINK_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        if(!document.querySelector('link[href="'+L_LINK_CSS+'"]')){
            const l = document.createElement('link'); l.rel='stylesheet'; l.href=L_LINK_CSS; document.head.appendChild(l);
        }
        if(!window.L){
            const s = document.createElement('script'); s.src = L_LINK_JS; s.onload = initMap; document.body.appendChild(s);
        } else initMap();
    }

    function initMap(){
        try{
            map = L.map('map', {zoomControl:true}).setView([55.76,37.64], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(map);
            markersLayer = L.layerGroup().addTo(map);
        }catch(e){ console.warn('Leaflet init failed', e); }
    }

    async function findPharmaciesByCoords(lat, lon){
        if(!map) ensureMap();
        markersLayer.clearLayers();
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy&limit=30&lat=${lat}&lon=${lon}`;
        try{
            const r = await fetch(url, {headers: {'Accept-Language':'ru'}});
            const js = await r.json();
            populateMapResults(js);
        }catch(e){ console.warn(e); }
    }

    async function findPharmaciesByCity(q){
        if(!q) return;
        if(!map) ensureMap();
        markersLayer.clearLayers();
        const geourl = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q);
        const g = await fetch(geourl);
        const gj = await g.json();
        if(!gj || gj.length===0){ document.getElementById('mapList').innerHTML = '<div class="result">Адрес не найден.</div>'; return; }
        const lat = gj[0].lat, lon = gj[0].lon;
        map.setView([lat,lon], 13);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy near ${encodeURIComponent(q)}&limit=30`;
        try{
            const r = await fetch(url);
            const js = await r.json();
            populateMapResults(js);
        }catch(e){ console.warn(e); }
    }

    function populateMapResults(items){
        const list = document.getElementById('mapList'); list.innerHTML='';
        if(!items || items.length===0){ list.innerHTML = '<div class="result">Аптек не найдено.</div>'; return; }
        items.forEach(it=>{
            const lat = it.lat, lon = it.lon;
            const name = (it.display_name||'').split(',')[0] || 'Аптека';
            const card = document.createElement('div'); card.className='pharmacy-card';
            const t = document.createElement('div'); t.className='pharm-title'; t.innerText = name;
            const s = document.createElement('div'); s.className='pharm-snippet'; s.innerText = it.display_name;
            const a = document.createElement('a'); a.href = 'https://www.openstreetmap.org/?mlat='+lat+'&mlon='+lon+'#map=18/'+lat+'/'+lon; a.target='_blank'; a.innerText='Открыть в OSM'; a.className='btn-link';
            card.appendChild(t); card.appendChild(s); card.appendChild(a);
            list.appendChild(card);
            try{ const m = L.marker([lat,lon]); m.bindPopup('<strong>'+name+'</strong><br/>'+it.display_name); markersLayer.addLayer(m); }catch(e){}
        });
        if(items[0] && items[0].lat) map.setView([items[0].lat, items[0].lon], 13);
    }

    const mapLocateBtn = document.getElementById('mapLocateBtn');
    if(mapLocateBtn) mapLocateBtn.addEventListener('click', ()=>{
        if(!navigator.geolocation){ alert('Геолокация недоступна'); return; }
        navigator.geolocation.getCurrentPosition(p=>{
            ensureMap();
            const lat = p.coords.latitude, lon = p.coords.longitude;
            map.setView([lat,lon], 14);
            findPharmaciesByCoords(lat, lon);
        }, e=>{ alert('Не удалось получить местоположение'); });
    });

    const mapFindBtn = document.getElementById('mapFindBtn');
    if(mapFindBtn) mapFindBtn.addEventListener('click', ()=>{
        const q = document.getElementById('mapCity').value.trim();
        if(!q){ alert('Введите город или адрес'); return; }
        ensureMap();
        findPharmaciesByCity(q);
    });

    document.querySelector('[data-target="tab-map"]').addEventListener('click', ()=>{ ensureMap(); });

    // Marketplace search handler
    const marketBtn = document.getElementById('marketSearchBtn');
    if(marketBtn) marketBtn.addEventListener('click', ()=>{
        const q = (document.getElementById('marketQuery') || {}).value || '';
        const vendorSel = document.getElementById('marketVendorSelect');
        const vendorVal = vendorSel ? vendorSel.value : '';
        const custom = (document.getElementById('marketCustom') || {}).value || '';
        const query = q.trim();
        if(!query){ alert('Введите, что искать на маркетплейсе.'); return; }
        const fullQuery = query;
        let url = '';
        switch((vendorVal||'').toLowerCase()){
            case 'wildberries': url = 'https://www.wildberries.ru/catalog/0/search.aspx?search=' + encodeURIComponent(fullQuery); break;
            case 'ozon': url = 'https://www.ozon.ru/search/?text=' + encodeURIComponent(fullQuery); break;
            case 'aliexpress': url = 'https://www.aliexpress.com/wholesale?SearchText=' + encodeURIComponent(fullQuery); break;
            case 'yandex': url = 'https://market.yandex.ru/search?text=' + encodeURIComponent(fullQuery); break;
            default:
                // custom marketplace provided?
                if(custom && custom.indexOf('.') !== -1){
                    // open Google with site:custom query to show results from that domain
                    url = 'https://www.google.com/search?q=' + encodeURIComponent('site:' + custom + ' ' + fullQuery);
                } else if(custom){
                    // search by marketplace name + query
                    url = 'https://www.google.com/search?q=' + encodeURIComponent(custom + ' ' + fullQuery);
                } else {
                    // fallback to Google general search
                    url = 'https://www.google.com/search?q=' + encodeURIComponent(fullQuery);
                }
                break;
        }
        window.open(url, '_blank');
    });
})();
