import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  BookOpen,
  Briefcase,
  RefreshCw,
  Share2,
} from 'lucide-react';
import { CurrencyCode, LanguageCode, formatPrice } from '../data/decorData';

export type AmbassadorTier = 'A++' | 'A+' | 'A' | 'B' | 'C';

export type ProductId =
  | 'DECORMATE'
  | 'SLABMATE'
  | 'SALONMATE'
  | 'AUTOBARTER'
  | 'TANARA'
  | 'TALAYAR'
  | 'EVENTMATE';

export type SaleType =
  | 'initial_license'
  | 'website_plus_license'
  | 'annual_renewal'
  | 'cross_module';

interface ProductSpecInfo {
  id: ProductId;
  nameFa: string;
  targetGuildFa: string;
  pitchHookFa: string;
  crossSellTargets: ProductId[];
}

const ACADEMY_PRODUCTS: Record<ProductId, ProductSpecInfo> = {
  DECORMATE: {
    id: 'DECORMATE',
    nameFa: '🛋️ DecorMate (کابینت، کمد و دکوراسیون)',
    targetGuildFa: 'نمایشگاه‌های کابینت، کارگاه‌های MDF و کلوزت‌روم',
    pitchHookFa:
      'فرمول ۶۰٪ زمینی + ۴۰٪ هوایی اتحادیه، محاسبه دقیق تعداد ورق MDF و یراق بلوم + قفل ضدتورم',
    crossSellTargets: ['SLABMATE', 'AUTOBARTER'],
  },
  SLABMATE: {
    id: 'SLABMATE',
    nameFa: '🏛️ SlabMate (کاشی، سرامیک اسلب و مصالح لوکس)',
    targetGuildFa: 'شوروم‌های کاشی و سرامیک اسلب، سنگ بوک‌مچ و شیرآلات توکار',
    pitchHookFa:
      'محاسبه متراژ کف و بدنه + ضریب پرتی برش اسلب (۸٪ تا ۱۲٪) + تعداد کیسه چسب پرسلانی و کلیپس همتراز',
    crossSellTargets: ['DECORMATE', 'AUTOBARTER'],
  },
  SALONMATE: {
    id: 'SALONMATE',
    nameFa: '💄 SalonMate (سالن زیبایی زنانه + سایت‌ساز + حسابداری)',
    targetGuildFa: 'سالن‌های زیبایی زنانه، عروس‌سراها و لاین‌های رنگ، لایت، کراتین و ناخن',
    pitchHookFa:
      'ویترین سایت‌ساز دائمی سالن (عکس بیرون، صندلی VIP، تخفیف روز خاص) + کسر هزینه مواد قبل از تقسیم درصد آرایشگر',
    crossSellTargets: ['EVENTMATE', 'TANARA', 'TALAYAR'],
  },
  AUTOBARTER: {
    id: 'AUTOBARTER',
    nameFa: '🚗 AutoBarter (نمایشگاه خودرو، راس‌گیری چک و تهاتر ملک)',
    targetGuildFa: 'اتوگالری‌ها، نمایشگاه‌های خودرو و هلدینگ‌های تهاتر ملک و آپارتمان',
    pitchHookFa:
      'محاسبه اقساط خودرو، فرمول دقیق راس‌گیری چک صیادی به روز/ماه و تراز هوشمند تهاتر ملک با خودرو',
    crossSellTargets: ['DECORMATE', 'SLABMATE', 'TALAYAR'],
  },
  TANARA: {
    id: 'TANARA',
    nameFa: '🦷 Tanara (کلینیک دندانپزشکی، ایمپلنت، لمینت و زیبایی)',
    targetGuildFa: 'کلینیک‌های دندانپزشکی، مراکز ایمپلنت فوری و طراحی لبخند دیجیتال',
    pitchHookFa:
      'برگه رسمی طرح درمان دیجیتال (ایمپلنت سوئیسی/کره‌ای + لمینت سرامیکی) با تقسیط چک صیادی بنفش',
    crossSellTargets: ['SALONMATE', 'EVENTMATE'],
  },
  TALAYAR: {
    id: 'TALAYAR',
    nameFa: '💎 TalaYar (طلافروشی، جواهرات، سکه و طلای اقساطی)',
    targetGuildFa: 'گالری‌های طلا و جواهر، سرویس عروس و فروشندگان طلای چکی',
    pitchHookFa:
      'فرمول قانونی سامانه مودیان (۹٪ مالیات فقط روی اجرت و سود، معافیت اصل طلا) + کسر طلای کهنه',
    crossSellTargets: ['EVENTMATE', 'SALONMATE'],
  },
  EVENTMATE: {
    id: 'EVENTMATE',
    nameFa: '👑 EventMate (باغ‌تالار، تشریفات عروسی و مجالس)',
    targetGuildFa: 'باغ‌تالارها، عمارت‌های عروسی و تشریفات مجالس VIP',
    pitchHookFa:
      'منوساز زنده سر میز عروس و داماد + اسلایدر تسهیم هزینه دو خانواده + قفل ضدتورم نرخ گوشت و برنج',
    crossSellTargets: ['SALONMATE', 'TALAYAR', 'TANARA'],
  },
};

interface Props {
  currency: CurrencyCode;
  lang: LanguageCode;
}

export const TavanaAmbassadorAcademySimulator: React.FC<Props> = ({ currency, lang }) => {
  // Candidate Profile State
  const [candidateName, setCandidateName] = useState('سیاوش امیری (سفیر ارشد)');
  const [candidateSheba, setCandidateSheba] = useState('IR820540102680020817909002');
  const [generalExamScore, setGeneralExamScore] = useState(96);
  const [simulatedDealsPassed, setSimulatedDealsPassed] = useState(true);
  const [reassessmentRequired, setReassessmentRequired] = useState(false);

  // Specialized Product State
  const [selectedProduct, setSelectedProduct] = useState<ProductId>('SALONMATE');
  const [trainingCompleted, setTrainingCompleted] = useState(true);
  const [productExamScore, setProductExamScore] = useState(92);
  const [tabletSimulationPassed, setTabletSimulationPassed] = useState(true);

  // Commission & Cross-Sell State
  const [saleType, setSaleType] = useState<SaleType>('website_plus_license');
  const [dealBaseAmountToman, setDealBaseAmountToman] = useState(29000000);
  const [referralClientName, setReferralClientName] = useState('سالن زیبایی ملکه طلایی — الهیه');
  const [createdReferrals, setCreatedReferrals] = useState<
    Array<{
      code: string;
      client: string;
      source: ProductId;
      targets: ProductId[];
      expiresFa: string;
    }>
  >([
    {
      code: 'TVN-XREF-994821',
      client: 'عمارت عروسی قصر طلایی -> معرفی به سالن زیبایی و طلافروشی',
      source: 'EVENTMATE',
      targets: ['SALONMATE', 'TALAYAR'],
      expiresFa: '۳۰ روز کامل (قفل سرنخ فعال)',
    },
  ]);

  // 1. Evaluate General Academy Tier
  let assignedTier: AmbassadorTier = 'C';
  let tuitionPolicyFa = '';
  let generalNextActionFa = '';

  if (generalExamScore >= 95 && simulatedDealsPassed) {
    assignedTier = 'A++';
    tuitionPolicyFa = 'بورسیه ۱۰۰٪ رایگان دوره تخصصی + ۵٪ پاداش پورسانت مازاد (VIP Star)';
    generalNextActionFa = 'واجد شرایط گواهی ارشد A++ و انتخاب رایگان تخصص در هر ۷ صنف';
  } else if (generalExamScore >= 85 && simulatedDealsPassed) {
    assignedTier = 'A+';
    tuitionPolicyFa = 'تخفیف نخبگان + ۲٪ پاداش پورسانت مازاد';
    generalNextActionFa = 'واجد شرایط گواهی ممتاز A+ و ورود به آموزش تخصصی محصول';
  } else if (generalExamScore >= 70) {
    assignedTier = 'A';
    tuitionPolicyFa = 'مجاز به ثبت‌نام در دوره تخصصی محصول (Paid Specialized Training)';
    generalNextActionFa = 'قبول در آکادمی عمومی سطح A؛ آماده گذراندن دوره تخصصی';
  } else if (generalExamScore >= 50) {
    assignedTier = 'B';
    tuitionPolicyFa = 'مردود مشروط — نیازمند رفع اشکال و آزمون مجدد (بدون مجوز فروش)';
    generalNextActionFa = 'عدم صدور مجوز مذاکره؛ تکرار تمرینات و آزمون مجدد الزامی است';
  } else {
    assignedTier = 'C';
    tuitionPolicyFa = 'مردود — نیازمند تکرار کامل دوره آموزش عمومی از ابتدا';
    generalNextActionFa = 'مسدود جهت فروش میدانی تا زمان گذراندن مجدد دوره عمومی';
  }

  // 2. Evaluate Product Specialization & Field Sales Authorization Gate
  let fieldAuthorized = true;
  let authorizationReasonFa = `مجوز رسمی فروش میدانی و دریافت پورسانت شبا برای محصول ${ACADEMY_PRODUCTS[selectedProduct].nameFa} صادر شد.`;

  if (reassessmentRequired) {
    fieldAuthorized = false;
    authorizationReasonFa = 'کاندیدا دارای پرچم بازآموزی اجباری (Reassessment) است.';
  } else if (assignedTier === 'B' || assignedTier === 'C') {
    fieldAuthorized = false;
    authorizationReasonFa = `سطح ${assignedTier} مجوز ورود به بازار و فروش میدانی را ندارد.`;
  } else if (!trainingCompleted) {
    fieldAuthorized = false;
    authorizationReasonFa = 'ماژول‌های آموزش تخصصی این صنف هنوز تکمیل نشده است.';
  } else if (productExamScore < 75) {
    fieldAuthorized = false;
    authorizationReasonFa = 'نمره آزمون تخصصی صنف کمتر از حد نصاب (۷۵ از ۱۰۰) است.';
  } else if (!tabletSimulationPassed) {
    fieldAuthorized = false;
    authorizationReasonFa =
      'شبیه‌سازی عملی مذاکره ۱۰ ثانیه‌ای تبلت و قفل کلید مخفی ویزیتور تایید نشده است.';
  }

  // 3. Commission Calculation Engine
  let baseRate = 0;
  if (saleType === 'initial_license') baseRate = 0.25;
  else if (saleType === 'website_plus_license') baseRate = 0.3;
  else if (saleType === 'annual_renewal') baseRate = 0.15;
  else if (saleType === 'cross_module') baseRate = 0.35;

  const tierBonusRate =
    assignedTier === 'A++' ? 0.05 : assignedTier === 'A+' ? 0.02 : 0;

  const effectiveRate = fieldAuthorized ? baseRate + tierBonusRate : 0;
  const payoutToman = fieldAuthorized ? Math.round(dealBaseAmountToman * effectiveRate) : 0;

  return (
    <section
      id="tavana-academy-simulator"
      aria-label="Tavana City Ambassador Academy Live Simulator"
      className="py-10 px-4 sm:px-8 max-w-[1440px] mx-auto"
    >
      <div className="hc-card rounded-3xl bg-gradient-to-b from-[#1E1108] via-[#2C180C] to-[#170C06] text-white border-2 border-[#D4AF37] p-6 sm:p-10 space-y-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#1E1108] text-xs font-extrabold">
              <Award className="w-4 h-4" />
              <span>Tavana City — Ambassador Academy Core v3.0 (شبیه‌ساز زنده ممیزی و آموزش سفیران)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF7F2]">
              🎓 آکادمی جامع سفیران فروش توانا سیتی (سطح‌بندی A++ تا C، مجوز تخصصی ۷ صنف و هاب پورسانت)
            </h2>
            <p className="text-xs sm:text-sm text-[#F6E27A]/90 max-w-4xl leading-relaxed">
              هیچ سفیری بدون قبولی در «آکادمی عمومی» و «شبیه‌سازی ۱۰ ثانیه‌ای تبلت در صنف تخصصی» اجازه مذاکره با مشتری واقعی را ندارد. در این پنل می‌توانید تمام قوانین ممیزی، امتیازدهی، قفل فروش و محاسبه پورسانت ۲۵٪ تا ۴۰٪ را به صورت زنده تست کنید.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span
              className={`px-4 py-2 rounded-2xl text-sm font-extrabold border-2 flex items-center gap-2 ${
                fieldAuthorized
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                  : 'bg-red-600/30 border-red-400 text-red-200'
              }`}
            >
              {fieldAuthorized ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>مجوز فروش میدانی: فعال ({assignedTier})</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span>مجوز فروش میدانی: مسدود ({assignedTier})</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* 4-Step General Academy Curriculum Cards */}
        <div className="space-y-3">
          <div className="text-xs sm:text-sm font-extrabold text-[#F6E27A] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>گام اول: ۴ سرفصل اجباری «آکادمی عمومی سفیران» (مشترک برای تمامی گروه‌ها قبل از انتخاب صنف):</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: 'ماژول عمومی ۱',
                title: 'قلاب ۱۰ ثانیه‌ای تبلت + قفل کلید مخفی',
                desc: 'تایپ نام مغازه قبل از ورود، قفل کردن حالت مخفی ویزیتور و نمایش پیش‌فاکتور طلاکوب با نام خود خریدار در ثانیه اول.',
              },
              {
                step: 'ماژول عمومی ۲',
                title: 'پیشنهاد رد نشدنی «تحویل سایت دائمی»',
                desc: 'تبدیل همان صفحه به سایت اختصاصی دائمی خریدار (بدون هزینه ۵۰ میلیونی طراحی سایت و بدون دردسر اینماد).',
              },
              {
                step: 'ماژول عمومی ۳',
                title: 'تکنیک چک صیادی بنفش + پیامک بدون فیلتر',
                desc: 'بستن قرارداد با جدول چک صیادی، قفل ضدتورم و ارسال آنی فاکتور با پیامک عادی و عکس گالری (بدون نیاز به اینترنت).',
              },
              {
                step: 'ماژول عمومی ۴',
                title: 'مدیریت اعتراضات (ROI) و انضباط CRM',
                desc: 'اثبات بازگشت ۱۰ برابری کل هزینه لایسنس تنها با حفظ ۱ مشتری در ماه + ثبت قفل ۳۰ روزه سرنخ در هاب.',
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/40 space-y-2"
              >
                <span className="px-2.5 py-0.5 rounded-lg bg-[#D4AF37] text-[#1E1108] text-[11px] font-extrabold">
                  {m.step}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-white">{m.title}</h3>
                <p className="text-[11px] text-white/80 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Simulator Grid: Left = General & Product Evaluation, Right = Authorization Gate & Commission Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Exam & Specialization Controls */}
          <div className="lg:col-span-7 space-y-5 bg-white/5 border border-[#D4AF37]/40 rounded-3xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-extrabold text-[#F6E27A] flex items-center gap-2 border-b border-white/15 pb-3">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>۱. شبیه‌ساز آزمون عمومی و تعیین رتبه سفیر (evaluateGeneralExam)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1 font-bold">نام کاندیدا / سفیر فروش:</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-[#D4AF37]/50 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 font-bold">شماره شبا جهت واریز پورسانت:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={candidateSheba}
                  onChange={(e) => setCandidateSheba(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-[#D4AF37]/50 text-[#F6E27A] font-mono-tabular font-bold"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>نمره آزمون جامع آکادمی عمومی (۰ تا ۱۰۰):</span>
                <span className="font-mono-tabular text-base text-[#F6E27A]">
                  {generalExamScore} / 100 — رتبه فعلی: {assignedTier}
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                step={1}
                value={generalExamScore}
                onChange={(e) => setGeneralExamScore(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/65 font-mono-tabular mt-1">
                <span>&lt;50: رتبه C (مردود)</span>
                <span>50-69: رتبه B (بازآموزی)</span>
                <span>70-84: رتبه A</span>
                <span>85-94: رتبه A+ (+۲٪)</span>
                <span>95+: رتبه A++ (+۵٪)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setSimulatedDealsPassed(!simulatedDealsPassed)}
                className={`p-3 rounded-xl border font-bold flex items-center justify-between cursor-pointer ${
                  simulatedDealsPassed
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                    : 'bg-red-600/30 border-red-400 text-red-200'
                }`}
              >
                <span>موفقیت در شبیه‌سازی اولیه فروش:</span>
                <span>{simulatedDealsPassed ? '✓ تایید شده' : '✕ رد شده'}</span>
              </button>

              <button
                type="button"
                onClick={() => setReassessmentRequired(!reassessmentRequired)}
                className={`p-3 rounded-xl border font-bold flex items-center justify-between cursor-pointer ${
                  !reassessmentRequired
                    ? 'bg-white/10 border-white/20 text-white/80'
                    : 'bg-amber-500 text-[#1E1108] border-amber-300'
                }`}
              >
                <span>وضعیت پرچم بازآموزی (Reassessment):</span>
                <span>{reassessmentRequired ? '⚠️ نیازمند بازآموزی' : '✓ وضعیت عادی'}</span>
              </button>
            </div>

            {/* Product Specialization Gate */}
            <div className="pt-4 border-t border-white/15 space-y-4">
              <h3 className="text-base sm:text-lg font-extrabold text-[#F6E27A] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                <span>۲. انتخاب صنف تخصصی و گیت مجوز فروش (evaluateProductSpecialization)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.keys(ACADEMY_PRODUCTS) as ProductId[]).map((pid) => {
                  const p = ACADEMY_PRODUCTS[pid];
                  const active = selectedProduct === pid;
                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => setSelectedProduct(pid)}
                      className={`p-3 rounded-xl border text-right text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#D4AF37] text-[#1E1108] border-white shadow-md'
                          : 'bg-white/10 text-white hover:bg-white/15 border-white/20'
                      }`}
                    >
                      <div>{p.nameFa}</div>
                      <div
                        className={`text-[10px] mt-0.5 truncate ${
                          active ? 'text-[#1E1108]/80' : 'text-white/65'
                        }`}
                      >
                        {p.targetGuildFa}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-[#D4AF37]/40 text-xs space-y-1">
                <div className="font-extrabold text-[#F6E27A]">
                  🎯 فرمول اختصاصی و قلاب فروش این صنف که سفیر باید حفظ باشد:
                </div>
                <p className="text-white/90 leading-relaxed">
                  {ACADEMY_PRODUCTS[selectedProduct].pitchHookFa}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>نمره آزمون تخصصی محصول ({selectedProduct}) — حداقل نصاب ۷۵:</span>
                  <span className="font-mono-tabular text-[#F6E27A]">{productExamScore} / 100</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  step={1}
                  value={productExamScore}
                  onChange={(e) => setProductExamScore(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTrainingCompleted(!trainingCompleted)}
                  className={`p-2.5 rounded-xl border font-bold cursor-pointer ${
                    trainingCompleted
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                      : 'bg-red-600/30 border-red-400 text-red-200'
                  }`}
                >
                  {trainingCompleted
                    ? '✓ دوره تخصصی صنف تکمیل شده'
                    : '✕ دوره تخصصی صنف ناقص است'}
                </button>

                <button
                  type="button"
                  onClick={() => setTabletSimulationPassed(!tabletSimulationPassed)}
                  className={`p-2.5 rounded-xl border font-bold cursor-pointer ${
                    tabletSimulationPassed
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                      : 'bg-red-600/30 border-red-400 text-red-200'
                  }`}
                >
                  {tabletSimulationPassed
                    ? '✓ شبیه‌سازی ۱۰ ثانیه‌ای تبلت تایید شد'
                    : '✕ شبیه‌سازی تبلت رد شده'}
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Live Output of Gatekeeper, Commission Engine & Cross-Sell Hub */}
          <div className="lg:col-span-5 space-y-5">
            {/* Gatekeeper Result Box */}
            <div
              className={`rounded-3xl p-6 border-2 space-y-3 ${
                fieldAuthorized
                  ? 'bg-emerald-950/50 border-emerald-400'
                  : 'bg-red-950/50 border-red-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#F6E27A]">
                  نتیجه گیت نهایی (authorizeFieldSales):
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/50 font-mono-tabular text-sm font-extrabold text-white">
                  TIER: {assignedTier}
                </span>
              </div>

              <div className="text-sm sm:text-base font-extrabold text-white">
                {authorizationReasonFa}
              </div>

              <div className="text-xs text-[#F6E27A] pt-1 border-t border-white/15">
                <strong>سیاست آموزشی این رتبه:</strong> {tuitionPolicyFa}
              </div>
              <div className="text-[11px] text-white/80">{generalNextActionFa}</div>
            </div>

            {/* Commission Calculator Box */}
            <div className="rounded-3xl bg-white/10 border-2 border-[#D4AF37] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                <h3 className="text-base font-extrabold text-[#F6E27A] flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>۳. موتور محاسبه پورسانت شبا (Commission Engine)</span>
                </h3>
                <span className="font-mono-tabular text-xs font-extrabold text-emerald-300">
                  نرخ موثر: {Math.round(effectiveRate * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'initial_license' as const, label: 'فروش لایسنس پایه (۲۵٪)' },
                  {
                    id: 'website_plus_license' as const,
                    label: 'لایسنس + سایت دائمی (۳۰٪)',
                  },
                  { id: 'cross_module' as const, label: 'فروش تقاطعی هاب (۳۵٪)' },
                  { id: 'annual_renewal' as const, label: 'تمدید سالانه (۱۵٪)' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSaleType(st.id)}
                    className={`p-2.5 rounded-xl font-bold border text-right cursor-pointer ${
                      saleType === st.id
                        ? 'bg-[#D4AF37] text-[#1E1108] border-white'
                        : 'bg-black/30 text-white border-white/20'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>مبلغ قرارداد فروش رفته به مشتری:</span>
                  <span className="font-mono-tabular text-[#F6E27A]">
                    {formatPrice(dealBaseAmountToman, currency, lang)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={95000000}
                  step={1000000}
                  value={dealBaseAmountToman}
                  onChange={(e) => setDealBaseAmountToman(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#D4AF37] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/75">پورسانت پایه نوع فروش:</span>
                  <span className="font-mono-tabular font-bold">{Math.round(baseRate * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">پاداش رتبه آکادمی ({assignedTier}):</span>
                  <span className="font-mono-tabular font-bold text-emerald-300">
                    +{Math.round(tierBonusRate * 100)}%
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/15 text-sm font-extrabold text-[#F6E27A]">
                  <span>مبلغ واریزی آنی به شبای سفیر:</span>
                  <span className="font-mono-tabular text-lg text-emerald-400">
                    {formatPrice(payoutToman, currency, lang)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cross-Module Ecosystem Referral Hub */}
            <div className="rounded-3xl bg-white/5 border border-[#D4AF37]/40 p-5 space-y-3 text-xs">
              <div className="font-extrabold text-[#F6E27A] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>۴. هاب فروش تقاطعی (TavanaEcosystemHub — قفل ۳۰ روزه سرنخ با ۳۵٪+ پورسانت)</span>
              </div>
              <p className="text-[11px] text-white/75">
                وقتی مشتریِ «{ACADEMY_PRODUCTS[selectedProduct].nameFa}» را به صنوف مکمل (
                {ACADEMY_PRODUCTS[selectedProduct].crossSellTargets.join(' ، ')}) معرفی کنید، سرنخ ۳۰ روز به نام شبای شما قفل می‌شود:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralClientName}
                  onChange={(e) => setReferralClientName(e.target.value)}
                  placeholder="نام مشتری جهت قفل ۳۰ روزه..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!referralClientName.trim()) return;
                    setCreatedReferrals([
                      {
                        code: `TVN-XREF-${Math.floor(100000 + Math.random() * 900000)}`,
                        client: referralClientName,
                        source: selectedProduct,
                        targets: ACADEMY_PRODUCTS[selectedProduct].crossSellTargets,
                        expiresFa: '۳۰ روز کامل (قفل شبا فعال)',
                      },
                      ...createdReferrals,
                    ]);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold cursor-pointer shrink-0"
                >
                  + ثبت قفل سرنخ
                </button>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto pt-1">
                {createdReferrals.map((ref) => (
                  <div
                    key={ref.code}
                    className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/40 flex items-center justify-between gap-2 text-[11px]"
                  >
                    <div>
                      <div className="font-bold text-white">{ref.client}</div>
                      <div className="text-emerald-300 font-mono-tabular">
                        {ref.code} | {ref.source} ➔ {ref.targets.join(', ')}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 font-bold shrink-0">
                      {ref.expiresFa}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
