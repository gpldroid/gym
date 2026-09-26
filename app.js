const $=s=>document.querySelector(s);
const state=JSON.parse(localStorage.getItem("fitlife")||'{"water":0,"done":[],"habits":{}}');
const save=()=>localStorage.setItem("fitlife",JSON.stringify(state));

const health=[
{id:"nutrition",icon:"🥗",title:"التغذية المتوازنة",tag:"تغذية",text:"كيف تبني وجبات متنوعة؟ تعرّف على البروتين والكربوهيدرات والدهون والألياف ودور التنوع الغذائي.",body:"الوجبة المتوازنة لا تعتمد على مكوّن واحد. اجمع مصدرًا للبروتين، وخضارًا أو فاكهة، ومصدرًا للكربوهيدرات المناسبة لك، مع الدهون الغذائية ضمن نمطك العام. احتياجاتك تختلف حسب العمر والنشاط والهدف."},
{id:"sleep",icon:"😴",title:"النوم والاستشفاء",tag:"استشفاء",text:"النوم جزء من خطة اللياقة، وليس وقتًا ضائعًا بين حصص التدريب.",body:"ضع موعدًا ثابتًا نسبيًا للنوم والاستيقاظ، خفف المنبهات مساءً، واجعل غرفة النوم مناسبة للراحة. إذا استمر الأرق أو كان النوم مصحوبًا بأعراض مقلقة فاستشر مختصًا."},
{id:"hydration",icon:"💧",title:"الترطيب",tag:"أساسيات",text:"الماء مهم لتنظيم حرارة الجسم ودعم وظائفه، وتزداد الحاجة مع الحرارة والتعرق والنشاط.",body:"اشرب بانتظام وفق عطشك وظروفك، واهتم بالسوائل أثناء النشاط الطويل أو في الجو الحار. لا توجد كمية واحدة تناسب الجميع."},
{id:"warmup",icon:"🔥",title:"الإحماء قبل التمرين",tag:"تدريب",text:"ابدأ تدريجيًا بدل الانتقال مباشرة إلى الجهد العالي.",body:"يمكن أن يبدأ الإحماء بحركة خفيفة ثم حركات ديناميكية مرتبطة بالتمرين. الهدف رفع الجاهزية تدريجيًا، وليس استنزاف الطاقة قبل الحصة."},
{id:"recovery",icon:"🧘",title:"الاستشفاء وإدارة الحمل",tag:"استشفاء",text:"التقدم يحتاج إلى توازن بين التحفيز والراحة.",body:"زد الحمل تدريجيًا، راقب التعب والألم، واترك وقتًا كافيًا بين الجلسات التي تستهدف العضلات نفسها. الألم الحاد أو المتزايد ليس إشارة لمواصلة الضغط."},
{id:"weight",icon:"⚖️",title:"إدارة الوزن",tag:"أساسيات",text:"الوزن يتأثر بالطاقة المتناولة والمصروفة وبعوامل متعددة، وليس بتمرين سحري.",body:"النتائج المستدامة عادة ترتبط بعادات قابلة للاستمرار: غذاء مناسب، حركة منتظمة، نوم جيد، ومتابعة التغير عبر فترة كافية. تجنب الوعود السريعة والحميات القاسية."},
{id:"heart",icon:"❤️",title:"صحة القلب والنشاط",tag:"تدريب",text:"المشي والأنشطة الهوائية المنتظمة يمكن أن تكون جزءًا من نمط حياة نشط.",body:"ابدأ بمستوى يمكنك تحمله ثم زد المدة أو الشدة تدريجيًا. اختر نشاطًا تستمتع به حتى يسهل الالتزام به."},
{id:"mental",icon:"🧠",title:"الصحة النفسية والحركة",tag:"أساسيات",text:"النشاط البدني يمكن أن يكون جزءًا من روتين صحي شامل، إلى جانب النوم والعلاقات والدعم المتخصص عند الحاجة.",body:"اجعل الحركة عادة مرنة وليست عقوبة. إذا كنت تعاني أعراضًا نفسية شديدة أو مستمرة، فالتواصل مع مختص صحي هو الخطوة المناسبة."}
];

const exercises=[
{id:"squat",icon:"🦵",name:"Squat — القرفصاء",cat:"الساقين",level:"مبتدئ",muscles:"الفخذان • المؤخرة • الجذع",equipment:"وزن الجسم",intro:"تمرين أساسي لتدريب نمط القرفصاء وبناء قوة الجزء السفلي.",steps:["قف والقدمان بعرض مناسب لك، والقدمين ثابتتين على الأرض.","شد الجذع وانظر للأمام، ثم ادفع الوركين للخلف واثنِ الركبتين.","انزل بمدى مريح مع بقاء القدمين ثابتتين والركبتين في اتجاه القدمين.","ادفع الأرض بقدميك واصعد مع المحافظة على الجذع ثابتًا."],breath:"خذ شهيقًا قبل النزول وزفيرًا أثناء الصعود.",mistakes:["ضم الركبتين إلى الداخل.","رفع الكعبين دون حاجة.","النزول بسرعة وفقدان التحكم.","إجبار الجسم على عمق مؤلم."]},
{id:"pushup",icon:"💪",name:"Push-up — تمرين الضغط",cat:"الصدر",level:"مبتدئ",muscles:"الصدر • الكتفين • الترايسبس • الجذع",equipment:"وزن الجسم",intro:"تمرين مركب للجزء العلوي يمكن تعديله على الحائط أو الركبتين أو الأرض.",steps:["ضع اليدين على الأرض أوسع قليلًا من الكتفين، أو اختر نسخة أسهل.","اجعل الجسم في خط متماسك من الرأس إلى الحوض.","اثنِ المرفقين وانزل بتحكم مع إبقاء الكتفين مستقرين.","ادفع الأرض حتى العودة لوضع البداية دون فقدان وضع الجذع."],breath:"شهيق أثناء النزول وزفير أثناء الدفع.",mistakes:["هبوط الحوض أو تقوس أسفل الظهر.","فتح المرفقين بشكل مبالغ.","تقصير المدى بسبب السرعة."]},
{id:"lunge",icon:"🦿",name:"Lunge — الاندفاع",cat:"الساقين",level:"مبتدئ",muscles:"الفخذان • المؤخرة • الجذع",equipment:"وزن الجسم",intro:"تمرين أحادي الجانب يساعد على تدريب القوة والتوازن.",steps:["قف مستقيمًا وخذ خطوة مناسبة إلى الأمام.","اخفض الجسم بثني الركبتين مع المحافظة على ثبات القدمين.","ادفع من القدم الأمامية وعد لوضع الوقوف.","كرر للجانب الآخر وحافظ على إيقاع متحكم."],breath:"تنفس طبيعيًا وحافظ على التحكم بدل حبس النفس.",mistakes:["فقدان التوازن بسبب خطوة ضيقة جدًا.","انهيار الركبة للداخل.","الدفع بسرعة دون تحكم."]},
{id:"plank",icon:"🧱",name:"Plank — البلانك",cat:"الجذع",level:"مبتدئ",muscles:"عضلات البطن • الجذع • الكتفين",equipment:"وزن الجسم",intro:"تمرين ثبات للجذع؛ الجودة أهم من إطالة الوقت.",steps:["ضع الساعدين أو اليدين تحت الكتفين.","مد الساقين واجعل الجسم في خط متماسك.","شد البطن والمؤخرة وحافظ على التنفس.","توقف عندما تبدأ الوضعية بالانهيار بدل مطاردة رقم زمني."],breath:"تنفس ببطء وباستمرار.",mistakes:["رفع الحوض عاليًا.","هبوط الحوض.","حبس النفس."]},
{id:"glutebridge",icon:"🍑",name:"Glute Bridge — جسر المؤخرة",cat:"الساقين",level:"مبتدئ",muscles:"المؤخرة • أوتار الركبة • الجذع",equipment:"وزن الجسم",intro:"حركة بسيطة لتدريب تمديد الورك والتحكم بالحوض.",steps:["استلقِ على ظهرك والركبتان مثنيتان والقدمان ثابتتان.","شد الجذع واضغط بالقدمين على الأرض.","ارفع الحوض حتى يصبح الجذع والفخذان في وضع متناسق دون مبالغة.","اخفض الحوض ببطء وكرر."],breath:"زفير أثناء الرفع وشهيق أثناء العودة.",mistakes:["المبالغة في تقويس أسفل الظهر.","الدفع من أطراف الأصابع.","الحركة السريعة."]},
{id:"row",icon:"🏋️",name:"Dumbbell Row — سحب الدمبل",cat:"الظهر",level:"متوسط",muscles:"الظهر • العضلة ذات الرأسين • الجذع",equipment:"دمبل",intro:"حركة سحب للجزء العلوي تحتاج إلى وضع جذع ثابت.",steps:["ثبت وضعية الانحناء مع ظهر محايد.","اسحب الدمبل نحو جانب الجذع مع إبقاء الكتف تحت السيطرة.","توقف لحظة قصيرة ثم اخفض الوزن ببطء.","كرر للجهة الأخرى إذا كنت تستخدم دمبل واحدًا."],breath:"زفير أثناء السحب وشهيق أثناء خفض الوزن.",mistakes:["تدوير الجذع للحصول على وزن أكبر.","سحب الوزن بالزخم.","تقريب الكتف من الأذن."]},
{id:"shoulderpress",icon:"🏋️‍♂️",name:"Shoulder Press — ضغط الكتف",cat:"الكتفين",level:"متوسط",muscles:"الكتف • الترايسبس • الجذع",equipment:"دمبل",intro:"ضغط عمودي للكتفين مع ضرورة اختيار وزن يسمح بالتحكم.",steps:["ابدأ بالأوزان قرب مستوى الكتف.","شد الجذع واضغط الأوزان إلى أعلى ضمن مسار مريح.","لا تحول الحركة إلى دفع بالظهر.","أنزل الأوزان ببطء إلى وضع البداية."],breath:"زفير أثناء الدفع وشهيق أثناء النزول.",mistakes:["استخدام وزن لا يمكن التحكم به.","تقويس الظهر بقوة.","تسريع مرحلة النزول."]},
{id:"deadbug",icon:"🐞",name:"Dead Bug — ديد باغ",cat:"الجذع",level:"مبتدئ",muscles:"الجذع • البطن",equipment:"وزن الجسم",intro:"تمرين للتحكم بالجذع وتنسيق حركة الذراعين والساقين.",steps:["استلقِ وارفع الذراعين والساقين بوضع البداية.","ثبت أسفل الظهر بوضع مريح ثم مد ذراعًا وساقًا معاكسة.","عد ببطء وبدّل الجهة.","قلل المدى إذا فقدت التحكم بالجذع."],breath:"تنفس ببطء ولا تحبس النفس.",mistakes:["رفع أسفل الظهر عن الأرض.","تحريك الأطراف بسرعة.","اختيار مدى أكبر من قدرتك."]},
{id:"calfraise",icon:"🦶",name:"Calf Raise — رفع الساق",cat:"الساقين",level:"مبتدئ",muscles:"عضلات الساق الخلفية",equipment:"وزن الجسم",intro:"حركة بسيطة لتدريب عضلات الساق مع إمكانية استخدام دعم للتوازن.",steps:["قف بثبات ويمكنك الإمساك بدعم.","ارفع الكعبين تدريجيًا إلى أعلى نقطة مريحة.","توقف لحظة ثم اخفض الكعبين بتحكم.","كرر دون ارتداد سريع."],breath:"تنفس طبيعيًا.",mistakes:["الارتداد بدل الحركة المتحكم بها.","فقدان التوازن.","مدى حركة قصير جدًا بسبب السرعة."]},
{id:"mountain",icon:"🏃",name:"Mountain Climbers — متسلق الجبل",cat:"كارديو",level:"متوسط",muscles:"الجذع • الورك • الكتفين",equipment:"وزن الجسم",intro:"حركة ديناميكية ترفع نبض القلب وتحتاج إلى تحكم في وضعية الجذع.",steps:["ابدأ بوضعية الضغط.","اجلب ركبة نحو الصدر دون رفع الحوض كثيرًا.","أعد الساق وبدّل الجهة بإيقاع مناسب.","ابدأ ببطء ثم زد السرعة إذا بقيت التقنية سليمة."],breath:"تنفس بإيقاع منتظم مع الحركة.",mistakes:["رفع الحوض عاليًا.","القفز بسرعة دون تحكم.","إهمال وضع الكتفين."]},
{id:"walking",icon:"🚶",name:"Brisk Walk — المشي السريع",cat:"كارديو",level:"مبتدئ",muscles:"الجسم كاملًا",equipment:"لا شيء",intro:"خيار عملي للنشاط الهوائي يمكن تعديل سرعته ومدته بسهولة.",steps:["ابدأ بوتيرة مريحة ثم زد السرعة تدريجيًا.","حافظ على وضعية طبيعية للذراعين والجذع.","استمر بوتيرة تسمح لك بالتحكم في التنفس.","خفف السرعة تدريجيًا في نهاية الجلسة."],breath:"تنفس طبيعيًا وحاول الحفاظ على إيقاع مستقر.",mistakes:["رفع الشدة فجأة.","تجاهل الألم.","إهمال الحذاء والسطح المناسب."]}
];

const programs=[
{id:"beginner",icon:"🌱",title:"بداية اللياقة — 3 أيام",level:"مبتدئ",text:"برنامج تعريفي يركز على الحركة الأساسية والثبات.",days:["اليوم 1: Squat + Push-up + Glute Bridge","اليوم 2: مشي سريع 25–35 دقيقة","اليوم 3: Lunge + Plank + Dead Bug"]},
{id:"strength",icon:"💪",title:"قوة أساسية — 4 أيام",level:"مبتدئ/متوسط",text:"تقسيم بسيط لتكرار أنماط الدفع والسحب والساقين.",days:["اليوم 1: Squat + Push-up","اليوم 2: Row + Shoulder Press","اليوم 3: راحة أو مشي خفيف","اليوم 4: Lunge + Glute Bridge + Plank"]},
{id:"home",icon:"🏠",title:"تمرين منزلي — 20 دقيقة",level:"بدون معدات",text:"حصة قصيرة تعتمد على وزن الجسم.",days:["إحماء 4 دقائق","Squat — 3 مجموعات","Push-up — 3 مجموعات","Glute Bridge — 3 مجموعات","Plank — 3 جولات"]},
{id:"cardio",icon:"❤️",title:"نشاط هوائي تدريجي",level:"مبتدئ",text:"بداية مرنة لبناء عادة الحركة الهوائية.",days:["مشي سريع 20 دقيقة","راحة أو حركة خفيفة","مشي سريع 25 دقيقة","راحة","مشي سريع 30 دقيقة"]}
];

const nutrition=[
{id:"protein",icon:"🥚",title:"البروتين وبناء العضلات",text:"البروتين يساهم في بناء وإصلاح الأنسجة. وزّع مصادره ضمن وجباتك بدل التركيز على منتج واحد.",body:"المصادر قد تشمل البيض، الألبان، الأسماك، اللحوم، البقوليات وغيرها. الاحتياج الفردي يتأثر بالوزن والنشاط والهدف والحالة الصحية."},
{id:"meal",icon:"🍽️",title:"كيف تبني وجبة مناسبة؟",text:"فكر في الوجبة كنظام متنوع: مصدر بروتين + خضار/فاكهة + مصدر كربوهيدرات + دهون مناسبة.",body:"لا توجد تركيبة واحدة مثالية للجميع. اختر أطعمة كاملة ومتنوعة وراعِ احتياجاتك وتفضيلاتك الثقافية والاقتصادية."},
{id:"carbs",icon:"🍚",title:"الكربوهيدرات والتمرين",text:"الكربوهيدرات مصدر مهم للطاقة، خصوصًا مع النشاط البدني.",body:"الأرز، البطاطس، الشوفان، الخبز والحبوب والفاكهة أمثلة لمصادر كربوهيدرات. الكمية والتوقيت يعتمدان على إجمالي نمطك الغذائي ونوع النشاط."},
{id:"recovery",icon:"🛌",title:"ماذا تفعل في يوم الراحة؟",text:"الراحة لا تعني الجمود. الحركة الخفيفة والنوم الجيد قد يساعدانك على العودة للحصة التالية.",body:"يمكن أن يكون يوم الراحة للمشي الخفيف، الحركة اليومية، النوم، وتناول غذاء مناسب بدل محاولة تعويض كل شيء بتمرين إضافي."}
];

function renderHealth(filter="الكل"){
const data=filter==="الكل"?health:health.filter(x=>x.tag===filter);
$("#healthGrid").innerHTML=data.map(x=>`<article class="content-card"><div class="card-icon">${x.icon}</div><span class="pill">${x.tag}</span><h3>${x.title}</h3><p>${x.text}</p><button class="text-btn" data-health="${x.id}">اقرأ الموضوع ←</button></article>`).join("");
document.querySelectorAll("[data-health]").forEach(b=>b.onclick=()=>{const x=health.find(v=>v.id===b.dataset.health);openModal(`<span class="eyebrow">${x.tag}</span><h2>${x.icon} ${x.title}</h2><p class="lead">${x.text}</p><div class="article-body"><p>${x.body}</p><h3>نقطة عملية</h3><p>ابدأ بتغيير صغير يمكن تكراره، ثم قيّم أثره على المدى الطويل بدل البحث عن حلول سريعة.</p></div>`)});
}
function renderFilters(){
const tags=["الكل","أساسيات","تغذية","تدريب","استشفاء"];
$("#healthFilters").innerHTML=tags.map(t=>`<button class="filter ${t==="الكل"?"active":""}" data-h="${t}">${t}</button>`).join("");
document.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-h]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderHealth(b.dataset.h)});
const cats=["الكل","الساقين","الصدر","الظهر","الكتفين","الجذع","كارديو"];
$("#exerciseFilters").innerHTML=cats.map(t=>`<button class="filter dark-filter ${t==="الكل"?"active":""}" data-e="${t}">${t}</button>`).join("");
document.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-e]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderExercises(b.dataset.e)});
}
function renderExercises(cat="الكل"){
const q=($("#exerciseSearch")?.value||"").trim().toLowerCase();
let data=cat==="الكل"?exercises:exercises.filter(x=>x.cat===cat);
if(q)data=data.filter(x=>(x.name+x.cat+x.muscles+x.equipment).toLowerCase().includes(q));
$("#exerciseGrid").innerHTML=data.map(x=>`<article class="exercise-card"><div class="exercise-art"><span>${x.icon}</span><small>${x.level}</small></div><div class="exercise-info"><span class="pill">${x.cat}</span><h3>${x.name}</h3><p>${x.intro}</p><div class="meta"><span>🎯 ${x.muscles}</span><span>🏋️ ${x.equipment}</span></div><button class="btn primary full" data-ex="${x.id}">طريقة الأداء بالتفصيل</button></div></article>`).join("");
document.querySelectorAll("[data-ex]").forEach(b=>b.onclick=()=>showExercise(exercises.find(x=>x.id===b.dataset.ex)));
}
function showExercise(x){
openModal(`<div class="exercise-detail"><div class="detail-icon">${x.icon}</div><span class="pill">${x.level} • ${x.cat}</span><h2>${x.name}</h2><p class="lead">${x.intro}</p><div class="detail-grid"><div><h3>العضلات المستهدفة</h3><p>${x.muscles}</p></div><div><h3>المعدات</h3><p>${x.equipment}</p></div></div><h3>خطوات الأداء الصحيحة</h3><ol class="steps">${x.steps.map(s=>`<li>${s}</li>`).join("")}</ol><div class="tip"><b>التنفس:</b> ${x.breath}</div><h3>أخطاء شائعة</h3><ul class="mistakes">${x.mistakes.map(s=>`<li>${s}</li>`).join("")}</ul><button class="btn primary full" id="markEx">تسجيل هذا التمرين كمكتمل</button></div>`);
$("#markEx").onclick=()=>{if(!state.done.includes(x.id))state.done.push(x.id);save();updateProgress();$("#markEx").textContent="تم تسجيل التمرين ✓"};
}
function renderPrograms(){$("#programGrid").innerHTML=programs.map(x=>`<article class="program-card"><div class="program-icon">${x.icon}</div><span class="pill">${x.level}</span><h3>${x.title}</h3><p>${x.text}</p><ul>${x.days.map(d=>`<li>${d}</li>`).join("")}</ul></article>`).join("")}
function renderNutrition(){$("#nutritionGrid").innerHTML=nutrition.map(x=>`<article class="content-card"><div class="card-icon">${x.icon}</div><h3>${x.title}</h3><p>${x.text}</p><button class="text-btn" data-nut="${x.id}">التفاصيل ←</button></article>`).join("");document.querySelectorAll("[data-nut]").forEach(b=>b.onclick=()=>{const x=nutrition.find(v=>v.id===b.dataset.nut);openModal(`<div class="card-icon">${x.icon}</div><h2>${x.title}</h2><p class="lead">${x.text}</p><div class="article-body"><p>${x.body}</p></div>`)})}
function openModal(html){$("#modalContent").innerHTML=html;$("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open")}
function closeModal(){$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
$("#closeModal").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#exerciseSearch").oninput=()=>{const active=document.querySelector("[data-e].active");renderExercises(active?.dataset.e||"الكل")};

function water(){const n=Math.min(state.water,8);$("#waterBig").textContent=n;$("#waterBar").style.width=(n/8*100)+"%"}
$("#addWater").onclick=()=>{state.water=Math.min(8,state.water+1);save();water()};$("#resetWater").onclick=()=>{state.water=0;save();water()};
$("#bmiBtn").onclick=()=>{const w=+$("#weight").value,h=+$("#height").value/100;if(!w||!h)return $("#bmiResult").textContent="أدخل الوزن والطول";const b=w/(h*h);$("#bmiResult").textContent="BMI: "+b.toFixed(1)};
$("#calBtn").onclick=()=>{const a=+$("#age").value,w=+$("#weight").value,h=+$("#height").value;if(!a||!w||!h)return $("#calResult").textContent="أدخل العمر والوزن والطول";const b=$("#sex").value==="m"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;$("#calResult").textContent=Math.round(b*+$("#activity").value)+" kcal/day"};
function updateProgress(){$("#workoutCount").textContent=state.done.length}
["Workout","Water","Sleep"].forEach(k=>{const e=$("#habit"+k);e.checked=!!state.habits[k];e.onchange=()=>{state.habits[k]=e.checked;save()}});
$("#theme").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("fitlifeTheme",document.body.classList.contains("dark")?"dark":"light")};if(localStorage.getItem("fitlifeTheme")==="dark")document.body.classList.add("dark");
let promptEvent;addEventListener("beforeinstallprompt",e=>{e.preventDefault();promptEvent=e;$("#install").hidden=false});$("#install").onclick=()=>promptEvent&&promptEvent.prompt();
$("#lang").onclick=()=>alert("النسخة الإنجليزية الكاملة قيد الإضافة؛ المحتوى الحالي عربي أولًا.");
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
renderFilters();renderHealth();renderExercises();renderPrograms();renderNutrition();water();updateProgress();