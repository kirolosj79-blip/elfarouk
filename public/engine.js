const SEED = {"shift_template": {"products": ["بنزين 92", "بنزين 95", "سولار", "زيوت"], "channels": ["بنك", "بترو اب", "اوكتين", "بترو باي"], "cash_chain": ["الاجمالي", "مصاريف", "الصافي", "رصيد سابق بالخزينة", "الاجمالي", "ايداع بالبنك", "نقدا بالخزينة"]}};
/* ============================================================
   شركة الفاروق | Al Farouk Management System — prototype engine
   Fuel-station business: inventory, shifts, monthly P&L, tanks,
   EGPC commission, payment channels, supplier statement.
   All seed figures come from the analyzed workbooks (SEED).
   ============================================================ */
'use strict';

/* ---------- i18n dictionary (centralized) ---------- */
const DICT = {
  company:{ar:'شركة الفاروق',en:'Al Farouk'},
  tagline:{ar:'نظام إدارة محطة الوقود',en:'Fuel Station Management'},
  proto_note:{ar:'نموذج أولي — التخزين محلي بالمتصفح',en:'Prototype — data stored locally in your browser'},
  // nav groups
  g_main:{ar:'الرئيسية',en:'Main'},
  g_ops:{ar:'العمليات',en:'Operations'},
  g_fin:{ar:'المالية',en:'Financials'},
  g_sys:{ar:'النظام',en:'System'},
  // pages
  dashboard:{ar:'لوحة المعلومات',en:'Dashboard'},
  dashboard_sub:{ar:'نظرة عامة على أداء المحطة',en:'Overview of station performance'},
  inventory:{ar:'المخزون والأصناف',en:'Inventory & Items'},
  inventory_sub:{ar:'كارت الصنف وحركة الوارد والمنصرف',en:'Item cards, incoming & outgoing movements'},
  shifts:{ar:'تقفيل الورديات',en:'Shift Closings'},
  shifts_sub:{ar:'تقفيل الوردية اليومي والخزينة',en:'Daily shift closing & cash reconciliation'},
  monthly:{ar:'التقفيل الشهري',en:'Monthly Closing'},
  monthly_sub:{ar:'الأرباح والمصروفات ورأس المال',en:'Profit, expenses & capital'},
  tanks:{ar:'جرد التنكات',en:'Tank Reconciliation'},
  tanks_sub:{ar:'القياس وATG والبخر والعجز',en:'Dips, ATG, evaporation & variance'},
  commission:{ar:'العمولة والحافز',en:'Commission & Incentive'},
  commission_sub:{ar:'حافز هيئة البترول الشهري',en:'Monthly EGPC incentive'},
  channels:{ar:'قنوات التحصيل',en:'Collection Channels'},
  channels_sub:{ar:'بترو أب وأوكتين وبترو باي',en:'PetroApp, Octane & PetroPay'},
  supplier:{ar:'حساب المورد',en:'Supplier Account'},
  supplier_sub:{ar:'كشف حساب أولى إنرجي',en:'Oilibya Energy statement'},
  reports:{ar:'التقارير',en:'Reports'},
  reports_sub:{ar:'تقارير أسبوعية وشهرية وسنوية',en:'Weekly, monthly & yearly reports'},
  importexport:{ar:'الاستيراد والتصدير',en:'Import & Export'},
  importexport_sub:{ar:'استيراد ملفات إكسل وتصدير البيانات',en:'Import Excel files & export data'},
  settings:{ar:'الإعدادات',en:'Settings'},
  settings_sub:{ar:'إعدادات التطبيق والبيانات',en:'Application & data settings'},
  // generic
  total:{ar:'الإجمالي',en:'Total'},
  date:{ar:'التاريخ',en:'Date'},
  amount:{ar:'المبلغ',en:'Amount'},
  type:{ar:'النوع',en:'Type'},
  item:{ar:'الصنف',en:'Item'},
  code:{ar:'الكود',en:'Code'},
  qty:{ar:'الكمية',en:'Qty'},
  price:{ar:'السعر',en:'Price'},
  value:{ar:'القيمة',en:'Value'},
  notes:{ar:'ملاحظات',en:'Notes'},
  actions:{ar:'إجراءات',en:'Actions'},
  add:{ar:'إضافة',en:'Add'},
  edit:{ar:'تعديل',en:'Edit'},
  del:{ar:'حذف',en:'Delete'},
  save:{ar:'حفظ',en:'Save'},
  cancel:{ar:'إلغاء',en:'Cancel'},
  search:{ar:'بحث…',en:'Search…'},
  export_csv:{ar:'تصدير CSV',en:'Export CSV'},
  print:{ar:'طباعة / PDF',en:'Print / PDF'},
  confirm_del:{ar:'هل أنت متأكد من الحذف؟ لا يمكن التراجع.',en:'Delete this record? This cannot be undone.'},
  saved:{ar:'تم الحفظ بنجاح',en:'Saved successfully'},
  deleted:{ar:'تم الحذف',en:'Record deleted'},
  no_data:{ar:'لا توجد بيانات',en:'No data available'},
  egp:{ar:'ج.م',en:'EGP'},
  liter:{ar:'لتر',en:'L'},
  all:{ar:'الكل',en:'All'},
  // dashboard
  gross_sales:{ar:'إجمالي المبيعات (الوقود)',en:'Fuel Sales'},
  net_capital:{ar:'صافي رأس المال',en:'Net Capital'},
  total_capital:{ar:'إجمالي رأس المال',en:'Total Capital'},
  company_debt:{ar:'مديونية الشركة',en:'Company Payable'},
  month_incentive:{ar:'حافز آخر شهر',en:'Latest Incentive'},
  supplier_balance:{ar:'رصيد المورد',en:'Supplier Balance'},
  sales_trend:{ar:'اتجاه مبيعات الوقود الشهرية (لتر)',en:'Monthly Fuel Sales Trend (L)'},
  product_mix:{ar:'توزيع المبيعات حسب الصنف',en:'Sales Mix by Product'},
  incentive_trend:{ar:'اتجاه الحافز الشهري',en:'Monthly Incentive Trend'},
  channel_summary:{ar:'ملخص قنوات التحصيل (الشهر)',en:'Collection Channels (month)'},
  latest_month:{ar:'أحدث شهر مُقفّل',en:'Latest closed month'},
  recent_moves:{ar:'أحدث حركات المخزون',en:'Recent stock movements'},
  // inventory
  movements:{ar:'حركة المخزون',en:'Stock Movements'},
  items_cat:{ar:'الأصناف المتداولة',en:'Stocked Items'},
  opening_bal:{ar:'أرصدة أول وآخر المدة',en:'Opening / Closing Balances'},
  mv_in:{ar:'وارد',en:'In'},
  mv_out:{ar:'منصرف',en:'Out'},
  balance:{ar:'الرصيد',en:'Balance'},
  permit:{ar:'رقم الإذن',en:'Permit #'},
  party:{ar:'العميل / المورد',en:'Party'},
  group:{ar:'المجموعة',en:'Group'},
  supplier_f:{ar:'المورد',en:'Supplier'},
  open_qty:{ar:'رصيد أول المدة',en:'Opening Qty'},
  cur_qty:{ar:'الرصيد الحالي',en:'Current Qty'},
  open_value:{ar:'قيمة أول المدة',en:'Opening Value'},
  cur_value:{ar:'القيمة الحالية',en:'Current Value'},
  cost:{ar:'التكلفة',en:'Cost'},
  sell:{ar:'البيع',en:'Sell'},
  mv_type_add:{ar:'إضافة',en:'Receipt'},
  mv_type_out:{ar:'صرف',en:'Issue'},
  stock_value:{ar:'قيمة المخزون الحالي',en:'Current Stock Value'},
  items_count:{ar:'عدد الأصناف',en:'Items'},
  total_in:{ar:'إجمالي الوارد',en:'Total Receipts'},
  total_out:{ar:'إجمالي المنصرف',en:'Total Issues'},
  // shifts
  new_shift:{ar:'تقفيل وردية جديدة',en:'New Shift Closing'},
  shift_date:{ar:'تاريخ الوردية',en:'Shift Date'},
  shift_name:{ar:'رئيس الوردية',en:'Shift Lead'},
  sales_by_product:{ar:'المبيعات حسب الصنف',en:'Sales by Product'},
  collections:{ar:'التحصيل',en:'Collections'},
  expenses:{ar:'المصروفات',en:'Expenses'},
  prev_cash:{ar:'رصيد سابق بالخزينة',en:'Previous Cash'},
  bank_deposit:{ar:'إيداع بالبنك',en:'Bank Deposit'},
  cash_in_hand:{ar:'نقداً بالخزينة',en:'Cash in Hand'},
  net_after_exp:{ar:'الصافي بعد المصروفات',en:'Net after Expenses'},
  shift_total:{ar:'إجمالي الوردية',en:'Shift Total'},
  no_shifts:{ar:'لا توجد ورديات مسجلة بعد — ابدأ بتقفيل وردية جديدة.',en:'No shifts recorded yet — start a new shift closing.'},
  expense_line:{ar:'بند المصروف',en:'Expense item'},
  add_expense:{ar:'إضافة بند',en:'Add line'},
  reconcile:{ar:'مطابقة الخزينة',en:'Cash reconciliation'},
  // monthly
  fuel_income:{ar:'إيرادات الوقود',en:'Fuel Income'},
  oil_income:{ar:'نشاط الزيوت',en:'Oil Activity'},
  capital:{ar:'تقفيل رأس المال',en:'Capital Settlement'},
  label:{ar:'البيان',en:'Item'},
  liters_k:{ar:'لتر (بالألف)',en:'Liters (×1000)'},
  income_total:{ar:'إجمالي الإيرادات',en:'Total Income'},
  exp_total:{ar:'إجمالي المصروفات',en:'Total Expenses'},
  oil_profit:{ar:'ربح الزيت',en:'Oil Profit'},
  // tanks
  period:{ar:'الفترة',en:'Period'},
  solar:{ar:'سولار',en:'Diesel'},
  p92:{ar:'بنزين 92',en:'Gasoline 92'},
  p95:{ar:'بنزين 95',en:'Gasoline 95'},
  sold_net:{ar:'صافي المباع',en:'Net Sold'},
  calib:{ar:'العيارات',en:'Calibration'},
  sold_gross:{ar:'إجمالي المباع',en:'Gross Sold'},
  recon_detail:{ar:'تفاصيل الجرد',en:'Reconciliation detail'},
  variance:{ar:'الزيادة / العجز بعد البخر',en:'Variance (after evap.)'},
  evap:{ar:'البخر',en:'Evaporation'},
  select_period:{ar:'اختر الفترة',en:'Select period'},
  // commission
  sales:{ar:'المبيعات',en:'Sales'},
  comm_rate:{ar:'العمولة',en:'Commission'},
  percent:{ar:'النسبة',en:'Percent'},
  egpc_comm:{ar:'عمولة الهيئة',en:'EGPC Commission'},
  total_comm:{ar:'إجمالي العمولة',en:'Total Commission'},
  tax2:{ar:'ضريبة 2%',en:'Tax 2%'},
  net:{ar:'الصافي',en:'Net'},
  month:{ar:'الشهر',en:'Month'},
  incentive_value:{ar:'قيمة الحافز',en:'Incentive Value'},
  comm_formula:{ar:'المعادلة: اللترات المورّدة × سعر العمولة × النسبة − ضريبة 2٪ = صافي الحافز',
                en:'Formula: Supplied liters × Commission rate × Percent − 2% Tax = Net incentive'},
  comm_auto_note:{ar:'اللترات (sales) بتتجمّع تلقائي من «الوارد» في الورديات لكل صنف. النسب ثابتة يحددها المدير العام.',
                  en:'Liters (sales) are auto-summed from shift "incoming" per product. Rates are fixed, set by super admin.'},
  egpc_rates_title:{ar:'نسب حافز هيئة البترول (المدير العام فقط)',en:'EGPC commission rates (super admin)'},
  // income & expense ledger
  income_expense:{ar:'الإيرادات والمصروفات',en:'Income & Expenses'},
  income_expense_sub:{ar:'يومية الفلوس الداخلة والخارجة من الورديات',en:'Daily cash in & out from shifts'},
  income_col:{ar:'إيراد',en:'Income'},
  expense_col:{ar:'صرف',en:'Expense'},
  add_entry:{ar:'تسجيل حركة',en:'Add Entry'},
  entry_income:{ar:'إيراد',en:'Income'},
  entry_expense:{ar:'مصروف',en:'Expense'},
  entry_type:{ar:'النوع',en:'Type'},
  manual_tag:{ar:'يدوي',en:'Manual'},
  del_confirm:{ar:'حذف الحركة؟',en:'Delete entry?'},
  total_income:{ar:'إجمالي الإيراد',en:'Total income'},
  total_expense:{ar:'إجمالي الصرف',en:'Total expense'},
  ie_note:{ar:'كل الأرقام بتتجمّع تلقائي من الورديات: التحصيل والزيت = إيراد، وبنود المصروف = صرف.',
           en:'Auto-aggregated from shifts: collections & oils = income, expense lines = expense.'},
  // current stock
  current_stock:{ar:'الرصيد الحالي',en:'Current Stock'},
  opening_stock:{ar:'رصيد أول المدة',en:'Opening stock'},
  sold_col:{ar:'المنصرف (مباع)',en:'Issued (sold)'},
  incoming_col:{ar:'الوارد',en:'Incoming'},
  remaining:{ar:'المتبقي',en:'Remaining'},
  stock_note:{ar:'المتبقي = رصيد أول المدة + الوارد − المنصرف. الوارد والمنصرف بيتحسبوا تلقائي من الورديات. رصيد أول المدة بتدخله هنا.',
              en:'Remaining = opening + incoming − issued. Incoming & issued come from shifts; set opening here.'},
  opening_stock_title:{ar:'رصيد أول المدة (قابل للتعديل)',en:'Opening stock (editable)'},
  // channels (editable)
  bank_visa:{ar:'بنك / فيزا',en:'Bank / Visa'},
  withdrawals:{ar:'مسحوبات',en:'Withdrawals'},
  withdrawals_auto:{ar:'مسحوبات (تلقائي)',en:'Withdrawals (auto)'},
  service_fee:{ar:'رسوم خدمة',en:'Service fee'},
  opening_bal:{ar:'رصيد افتتاحي',en:'Opening balance'},
  running_bal:{ar:'الرصيد',en:'Balance'},
  add_entry:{ar:'إضافة إيداع/رسوم',en:'Add deposit/fee'},
  channel_note:{ar:'المسحوبات بتتجمّع تلقائي من تحصيل الورديات. الإيداع والرسوم والملاحظات بتدخلها يدوي. الرصيد = الافتتاحي + المسحوبات − (الإيداع + الرسوم)، ومُرحّل.',
                en:'Withdrawals auto-sum from shift collections. Deposit, fee & notes are manual. Balance = opening + withdrawals − (deposit + fee), carried.'},
  set_opening:{ar:'الرصيد الافتتاحي (مُرحّل)',en:'Opening balance (carried)'},
  // supplier (editable)
  supply:{ar:'توريد',en:'Supply'},
  payment:{ar:'سداد',en:'Payment'},
  add_supply:{ar:'توريد جديد',en:'New supply'},
  add_payment:{ar:'سداد / دفعة',en:'Payment'},
  supplier_name:{ar:'اسم المورد',en:'Supplier'},
  carried_balance:{ar:'رصيد مُرحّل',en:'Carried balance'},
  qty_liter:{ar:'الكمية (لتر)',en:'Qty (L)'},
  supply_line:{ar:'صنف التوريد',en:'Supply item'},
  add_line:{ar:'إضافة صنف',en:'Add item'},
  supplier_note:{ar:'التوريد = كمية × سعر (دين عليك، دائن). السداد بيتخصم (مدين). الرصيد جاري ومُرحّل تلقائي للشهر اللي بعده.',
                 en:'Supply = qty × price (credit/debt). Payment deducts (debit). Running balance is carried automatically.'},
  // channels
  opening_f:{ar:'رصيد افتتاحي',en:'Opening'},
  deposit:{ar:'إيداع',en:'Deposit'},
  withdraw:{ar:'مسحوبات',en:'Withdrawals'},
  fee:{ar:'رسوم خدمة',en:'Service Fee'},
  net_movement:{ar:'صافي الحركة',en:'Net Movement'},
  petroapp:{ar:'بترو أب',en:'PetroApp'},
  octane:{ar:'أوكتين',en:'Octane'},
  petropay:{ar:'بترو باي',en:'PetroPay'},
  // supplier
  invoice:{ar:'رقم الفاتورة',en:'Invoice #'},
  statement:{ar:'البيان',en:'Description'},
  debit:{ar:'مدين (سداد)',en:'Debit (paid)'},
  credit:{ar:'دائن (توريد)',en:'Credit (supply)'},
  total_supply:{ar:'إجمالي التوريدات',en:'Total Supplies'},
  total_paid:{ar:'إجمالي السداد',en:'Total Payments'},
  current_balance:{ar:'الرصيد الحالي',en:'Current Balance'},
  // reports
  weekly:{ar:'أسبوعي',en:'Weekly'},
  monthly_r:{ar:'شهري',en:'Monthly'},
  yearly:{ar:'سنوي',en:'Yearly'},
  custom:{ar:'فترة مخصصة',en:'Custom'},
  from:{ar:'من',en:'From'},
  to:{ar:'إلى',en:'To'},
  generate:{ar:'عرض التقرير',en:'Generate'},
  report_period:{ar:'فترة التقرير',en:'Report period'},
  // import/export
  import_excel:{ar:'استيراد ملف إكسل',en:'Import Excel file'},
  import_note:{ar:'اسحب ملف الورديات أو حركة المخزون هنا، أو اختر ملفاً. تتم المعاينة قبل الحفظ.',
               en:'Drop a shifts or stock-movement Excel file here, or choose one. A preview is shown before saving.'},
  export_all:{ar:'تصدير كل البيانات (JSON)',en:'Export all data (JSON)'},
  preview:{ar:'معاينة',en:'Preview'},
  rows_found:{ar:'صف تم التعرف عليه',en:'rows detected'},
  confirm_import:{ar:'تأكيد الاستيراد',en:'Confirm import'},
  // settings
  language:{ar:'اللغة',en:'Language'},
  theme:{ar:'المظهر',en:'Theme'},
  dark:{ar:'داكن',en:'Dark'},
  light:{ar:'فاتح',en:'Light'},
  reset_data:{ar:'إعادة تعيين البيانات للأصل',en:'Reset data to original'},
  reset_note:{ar:'يحذف كل التعديلات المحلية ويعيد البيانات المستوردة من الإكسل.',
              en:'Clears local changes and restores the imported Excel data.'},
  reset_done:{ar:'تمت إعادة التعيين',en:'Data reset'},
  data_model:{ar:'نموذج البيانات',en:'Data model'},
  about:{ar:'عن النظام',en:'About'},
  locked_file:{ar:'ملف محمي لم يُفتح',en:'Protected file not opened'},
  locked_note:{ar:'ملف واحد (~1.3 ميجا) بكلمة مرور مختلفة لم يُفتح بعد. أرسل كلمة مروره لإضافة بياناته.',
               en:'One file (~1.3 MB) uses a different password and was not opened. Send its password to include its data.'},
  disclaimer:{ar:'التخزين المحلي بالمتصفح للتجربة فقط — ليس قاعدة بيانات آمنة ولا يُزامن بين الأجهزة أو المستخدمين.',
              en:'Browser-local storage is for prototyping only — not a secure multi-user database, and it does not sync across devices or users.'},
  // auth / branches / users
  login:{ar:'تسجيل الدخول',en:'Sign in'},
  username:{ar:'اسم المستخدم',en:'Username'},
  password:{ar:'كلمة المرور',en:'Password'},
  login_sub:{ar:'نظام إدارة محطة الوقود',en:'Fuel Station Management'},
  login_err:{ar:'اسم المستخدم أو كلمة المرور غير صحيحة',en:'Invalid username or password'},
  login_hint:{ar:'ادخل باسم المستخدم وكلمة المرور الخاصة بك. لو نسيتهم اطلبهم من المدير العام.',
              en:'Enter your username and password. Forgot them? Ask the super admin.'},
  logout:{ar:'تسجيل الخروج',en:'Sign out'},
  super_admin:{ar:'مدير عام',en:'Super Admin'},
  branch_user:{ar:'مدير فرع',en:'Branch Manager'},
  data_entry:{ar:'مدخل بيانات',en:'Data Entry'},
  allowed_pages:{ar:'الصفحات المسموح بيها',en:'Allowed pages'},
  all_pages:{ar:'كل الصفحات (مدير الفرع)',en:'All pages (manager)'},
  entry_hint:{ar:'مدخل البيانات يقدر يضيف بيانات بس — ماينفعش يعدّل أو يحذف بعد الحفظ. مدير الفرع هو اللي يعدّل.',
              en:'Data entry can only add — cannot edit/delete after saving. Only the branch manager edits.'},
  rename_branch:{ar:'أسماء الفروع',en:'Branch names'},
  branches_title:{ar:'إدارة الفروع (المدير العام)',en:'Branches (super admin)'},
  // digital & mechanical
  digital_mech:{ar:'ديجيتال & ميكانيكي',en:'Digital & Mechanical'},
  digital_mech_sub:{ar:'قراءات العدّادات الرقمية ومقارنتها بالميكانيكي',en:'Digital meter readings vs mechanical'},
  digital:{ar:'ديجيتال',en:'Digital'},
  mechanical:{ar:'ميكانيكي',en:'Mechanical'},
  nozzle:{ar:'عداد',en:'Nozzle'},
  pump_n:{ar:'طلمبة',en:'Pump'},
  fuel_type:{ar:'الصنف',en:'Fuel'},
  diff_col:{ar:'الفرق',en:'Diff'},
  save_digital:{ar:'حفظ القراءات',en:'Save readings'},
  pick_shift:{ar:'اختر الوردية',en:'Select shift'},
  digital_hidden:{ar:'التجميع والمقارنة متاحة لمدير الفرع فقط — اكتب القراءات واحفظ.',en:'Totals & comparison visible to branch manager only — enter readings and save.'},
  comparison:{ar:'المقارنة (ديجيتال / ميكانيكي / الفرق)',en:'Comparison (digital / mechanical / diff)'},
  no_shifts_digital:{ar:'سجّل وردية الأول عشان تدخّل قراءاتها الرقمية.',en:'Record a shift first to enter its digital readings.'},
  daily_mode:{ar:'يومي',en:'Daily'},
  month_total:{ar:'إجمالي الشهر',en:'Month total'},
  branch:{ar:'الفرع',en:'Branch'},
  branches:{ar:'الفروع',en:'Branches'},
  all_branches:{ar:'كل الفروع',en:'All branches'},
  users:{ar:'المستخدمون والصلاحيات',en:'Users & Roles'},
  users_sub:{ar:'إنشاء المستخدمين وكلمات المرور وربطهم بالفروع',en:'Create users, passwords and branch access'},
  add_user:{ar:'مستخدم جديد',en:'New user'},
  role:{ar:'الصلاحية',en:'Role'},
  full_name:{ar:'الاسم',en:'Name'},
  images:{ar:'صور الفرع',en:'Branch Photos'},
  images_sub:{ar:'رفع وأرشفة صور المستندات والفواتير',en:'Upload & archive document/invoice photos'},
  upload_image:{ar:'رفع صورة',en:'Upload photo'},
  no_images:{ar:'لا توجد صور بعد — ارفع صورة من هذا الفرع.',en:'No photos yet — upload one for this branch.'},
  img_too_big:{ar:'الصورة كبيرة؛ تم تصغيرها للتخزين.',en:'Image large; resized for storage.'},
  viewing_branch:{ar:'تعرض الآن فرع',en:'Viewing branch'},
  switch_branch:{ar:'تبديل الفرع',en:'Switch branch'},
  // shift form
  new_shift_day:{ar:'تقفيل وردية',en:'Shift Closing'},
  pump_readings:{ar:'قراءات الطلمبات (عدّادات)',en:'Pump meter readings'},
  pump:{ar:'طلمبة',en:'Pump'},
  reading_start:{ar:'بداية',en:'Start'},
  reading_end:{ar:'نهاية',en:'End'},
  today_morning:{ar:'النهاردة الصبح',en:'Today AM'},
  yest_morning:{ar:'امبارح الصبح',en:'Yesterday AM'},
  carried:{ar:'مُرحّل تلقائي',en:'carried'},
  handover:{ar:'استلام رصيد أول الوردية',en:'Opening balance handover'},
  shift_lead_in:{ar:'ريس الوردية (بداية)',en:'Shift lead (in)'},
  shift_lead_out:{ar:'ريس الوردية (نهاية)',en:'Shift lead (out)'},
  start_row:{ar:'بداية',en:'Start'},
  end_row:{ar:'نهاية',en:'End'},
  liters_sold:{ar:'اللترات المباعة',en:'Liters sold'},
  auto:{ar:'تلقائي',en:'auto'},
  oils_sales:{ar:'مبيعات الزيوت',en:'Oils sales'},
  incoming:{ar:'الوارد',en:'Incoming'},
  invoice_no:{ar:'رقم الفاتورة',en:'Invoice #'},
  comm_per_liter:{ar:'العمولة (لكل لتر)',en:'Commission (per liter)'},
  comm_benzene:{ar:'عمولة البنزين',en:'Gasoline commission'},
  comm_solar:{ar:'عمولة السولار',en:'Diesel commission'},
  print_shift:{ar:'طباعة الوردية',en:'Print shift'},
  delivery_time:{ar:'وقت التسليم',en:'Delivery time'},
  grand_total:{ar:'الإجمالي العام',en:'Grand total'},
  save_print:{ar:'حفظ وطباعة',en:'Save & print'},
  assumption_note:{ar:'ملاحظة: الصافي النقدي = إجمالي المبيعات − (التحصيل الإلكتروني: بنك/بترو أب/أوكتين/بترو باي) − المصاريف. لو القاعدة عندك مختلفة قوللي أظبطها.',
                   en:'Note: Net cash = total sales − (electronic collections) − expenses. Tell me if your rule differs.'},
  monthly_new:{ar:'تقفيل شهر جديد',en:'New monthly closing'},
  print_month:{ar:'طباعة الشهر',en:'Print month'},
  profit:{ar:'ربح',en:'Profit'},
  by_band:{ar:'بالبنود — اضغط للتفاصيل',en:'by band — click for details'},
  price_comm_title:{ar:'الأسعار والعمولة (المدير العام فقط)',en:'Prices & Commission (super admin only)'},
  price_comm_note:{ar:'هذه القيم ثابتة للمحاسب ولا يستطيع تغييرها — تُطبّق على الورديات الجديدة في هذا الفرع',
                   en:'These values are locked for the accountant — applied to new shifts in this branch'},
  price_comm_hint:{ar:'التغيير يسري على الورديات الجديدة فقط؛ الورديات المحفوظة تحتفظ بسعرها وقت الإدخال.',
                   en:'Changes apply to new shifts only; saved shifts keep the price entered at the time.'},
  auto_from_shifts:{ar:'تلقائي من الورديات',en:'Auto from shifts'},
  manual_imported:{ar:'يدوي / مستورد',en:'Manual / imported'},
  month_pick:{ar:'اختر الشهر',en:'Pick month'},
  no_shifts_month:{ar:'لا توجد ورديات في هذا الشهر — سجّل ورديات أولاً.',en:'No shifts in this month — record shifts first.'},
  shifts_count:{ar:'عدد الورديات',en:'Shifts'},
  net_cash:{ar:'الصافي النقدي',en:'Net cash'},
  total_deposits:{ar:'إجمالي الإيداعات',en:'Total deposits'},
  // cloud
  cloud_setup:{ar:'الربط بالسحابة (Supabase)',en:'Cloud (Supabase)'},
  cloud_intro:{ar:'اربط النظام بقاعدة بيانات Supabase عشان يشتغل فعليًا ويتزامن بين الأجهزة والفروع. حطّ رابط المشروع والمفتاح العام (anon) تحت.',
               en:'Connect to a Supabase database so the app runs for real and syncs across devices and branches. Enter your project URL and anon public key.'},
  cloud_connect:{ar:'ربط واختبار',en:'Connect & test'},
  cloud_disconnect:{ar:'فصل السحابة',en:'Disconnect'},
  cloud_disconnected:{ar:'تم الفصل — رجعنا للوضع المحلي',en:'Disconnected — back to local mode'},
  cloud_testing:{ar:'جارٍ الاختبار…',en:'Testing…'},
  cloud_ok:{ar:'تم الاتصال بنجاح ✓ — سجّل الدخول من جديد',en:'Connected ✓ — please sign in again'},
  cloud_fail:{ar:'فشل الاتصال:',en:'Connection failed:'},
  cloud_need:{ar:'اكتب الرابط والمفتاح',en:'Enter URL and key'},
  cloud_sql_show:{ar:'سكربت قاعدة البيانات (SQL) — شغّله مرة واحدة',en:'Database script (SQL) — run once'},
  cloud_sql_hint:{ar:'في Supabase: افتح SQL Editor → New query → الصق السكربت ده → Run. بيعمل الجداول والصلاحيات وحساب المدير العام (barmas).',
                  en:'In Supabase: SQL Editor → New query → paste this → Run. Creates tables, policies, and the super-admin account (barmas).'},
  cloud_copy_sql:{ar:'نسخ السكربت',en:'Copy SQL'},
  cloud_guide:{ar:'لسه معندكش مشروع؟ ادخل supabase.com → New project → من Settings ▸ API هتلاقي الـ URL و anon key.',
               en:'No project yet? Go to supabase.com → New project → Settings ▸ API has your URL and anon key.'},
  cloud_mode:{ar:'متصل بالسحابة',en:'Cloud connected'},
  local_mode:{ar:'وضع محلي',en:'Local mode'},
  cloud_badge:{ar:'سحابة',en:'Cloud'},
  // oils lines
  oil_qty:{ar:'عدد',en:'Qty'},
  oil_price:{ar:'السعر',en:'Price'},
  add_oil_line:{ar:'إضافة صنف',en:'Add line'},
  oils_total:{ar:'إجمالي الزيوت',en:'Oils total'},
  // partners / staff accounts
  partners:{ar:'حسابات الموظفين',en:'Staff Accounts'},
  partners_sub:{ar:'سلف ومسحوبات الموظفين والشركاء — كل واحد وحسابه',en:'Staff & partner advances — an account per person'},
  add_partner:{ar:'موظف / شريك جديد',en:'New person'},
  person:{ar:'الاسم',en:'Name'},
  taken:{ar:'إجمالي المسحوب',en:'Total taken'},
  repaid:{ar:'إجمالي المُسدَّد',en:'Total repaid'},
  balance_due:{ar:'الرصيد المستحق عليه',en:'Balance due'},
  account:{ar:'الحساب',en:'Account'},
  none:{ar:'— بدون —',en:'— None —'},
  add_txn:{ar:'حركة جديدة',en:'New entry'},
  take_adv:{ar:'سلفة / مسحوب',en:'Advance / taken'},
  repay:{ar:'تسديد',en:'Repayment'},
  from_shift:{ar:'مصروف وردية',en:'Shift expense'},
  partner_note:{ar:'لما تختار اسم في بند المصروف، المبلغ بيتسجّل في حساب الشخص تلقائي.',
                en:'Tag an expense line with a person and its amount is posted to their account automatically.'},
  open_account:{ar:'فتح الحساب',en:'Open account'},
};

/* ---------- state ---------- */
let LANG = localStorage.getItem('farouk_lang') || 'ar';
let THEME = localStorage.getItem('farouk_theme') || 'dark';
let DB = null;
let ROUTE = 'dashboard';
const AR_MONTHS={'1':'يناير','2':'فبراير','3':'مارس','4':'أبريل','5':'مايو','6':'يونيو','7':'يوليو','8':'أغسطس','9':'سبتمبر','10':'أكتوبر','11':'نوفمبر','12':'ديسمبر'};

function t(k){const e=DICT[k];return e?(e[LANG]||e.ar):k;}

/* ---------- brand logo (fuel pump + drop) ---------- */
const LOGO_SVG=`<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Al Farouk">
  <defs><linearGradient id="lgMetal" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2a2206"/><stop offset="1" stop-color="#140f02"/></linearGradient></defs>
  <rect x="9" y="11" width="18" height="27" rx="3.2" fill="url(#lgMetal)" opacity=".92"/>
  <rect x="12" y="14.5" width="12" height="8.5" rx="1.6" fill="#ffe9ab"/>
  <path class="drop" d="M18 26.3c-1.9 2.4-3 4-3 5.6a3 3 0 0 0 6 0c0-1.6-1.1-3.2-3-5.6Z" fill="#1a1403"/>
  <path d="M27 16.5l3.4 3.4a2.4 2.4 0 0 1 .7 1.7v9.2a2.3 2.3 0 0 0 4.6 0V22c0-.9-.4-1.8-1-2.5l-3.5-3.6" stroke="#1a1403" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="33.3" cy="14.2" r="2" fill="#1a1403"/>
  <rect x="7" y="37" width="22" height="3.4" rx="1.7" fill="#1a1403"/>
</svg>`;

/* ---------- persistence + multi-branch + auth (see app_core.js) ----------
   APP holds users, branches, per-branch data and session.
   DB is a pointer to the active branch's dataset. */
let APP=null, USER=null;

/* ---------- number / date helpers ---------- */
function n(v){v=parseFloat(v);return isNaN(v)?0:v;}
function fmt(v,dec){
  if(v===null||v===undefined||v==='')return '—';
  const num=parseFloat(v);if(isNaN(num))return '—';
  const d=(dec===undefined)?(Math.abs(num)>=1000||Number.isInteger(num)?0:2):dec;
  return num.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
}
function money(v,dec){if(v===null||v===undefined||v==='')return '—';return fmt(v,dec)+' '+t('egp');}
function signed(v){const num=n(v);const cls=num>=0?'pos':'neg';return `<span class="${cls} num">${num>=0?'+':''}${fmt(num)}</span>`;}
function fmtDate(s){if(!s)return '—';const parts=String(s).split('-');if(parts.length!==3)return s;
  return LANG==='ar'?`${+parts[2]}/${+parts[1]}/${parts[0]}`:`${parts[0]}-${parts[1]}-${parts[2]}`;}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function sum(arr,f){return arr.reduce((a,x)=>a+n(f?f(x):x),0);}

/* ---------- animated number counters ---------- */
function reducedMotion(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
function animateCounters(scope){
  if(reducedMotion())return;
  (scope||document).querySelectorAll('[data-count]').forEach(el=>{
    const target=parseFloat(el.getAttribute('data-count'));if(isNaN(target))return;
    const dec=+el.getAttribute('data-dec')||0, suf=el.getAttribute('data-suf')||'';
    const dur=850, t0=performance.now();
    function step(now){
      let p=Math.min(1,(now-t0)/dur);p=1-Math.pow(1-p,3); // easeOutCubic
      const v=target*p;
      el.textContent=v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* ---------- toast ---------- */
function toast(msg,kind){
  const el=document.createElement('div');el.className='toast'+(kind?(' '+kind):'');el.textContent=msg;
  document.getElementById('toasts').appendChild(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transition='.3s';setTimeout(()=>el.remove(),300);},2600);
}

/* ---------- modal ---------- */
function modal(title,bodyHTML,footHTML){
  const root=document.getElementById('modalRoot');
  root.innerHTML=`<div class="overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal"><div class="modal-head"><h3>${esc(title)}</h3>
    <button class="x" onclick="closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>
    <div class="modal-body">${bodyHTML}</div>${footHTML?`<div class="modal-foot">${footHTML}</div>`:''}</div></div>`;
}
function closeModal(){document.getElementById('modalRoot').innerHTML='';}

/* ---------- navigation ---------- */
const NAV=[
  {g:'g_main',items:[['dashboard','grid']]},
  {g:'g_ops',items:[['inventory','box'],['shifts','clock'],['digital_mech','grid'],['tanks','droplet']]},
  {g:'g_fin',items:[['income_expense','card'],['monthly','trending'],['partners','wallet']]},
  {g:'g_sys',items:[['reports','file'],['users','users'],['settings','gear']]},
];
const SUPER_ONLY=['users'];
const ICONS={
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  box:'<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  droplet:'<path d="M12 2.5l5.5 6.5a7 7 0 1 1-11 0z"/>',
  trending:'<path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  truck:'<rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
  file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 15V3M7 8l5-5 5 5"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  wallet:'<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="17" cy="14" r="1.4"/>',
};
function icon(k){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]||''}</svg>`;}

function renderNav(){
  let h='';
  const allow=allowedPages();
  NAV.forEach(sec=>{
    const items=sec.items.filter(([key])=>!(SUPER_ONLY.includes(key)&&!isSuper()) && (!allow||allow.includes(key)));
    if(!items.length)return;
    h+=`<div class="nav-group">${t(sec.g)}</div>`;
    items.forEach(([key,ic])=>{
      h+=`<a href="#${key}" class="${ROUTE===key?'active':''}" onclick="go('${key}');return false;">${icon(ic)}<span>${t(key)}</span></a>`;
    });
  });
  document.getElementById('nav').innerHTML=h;
}

function go(route){const allow=allowedPages();if(allow&&!allow.includes(route)&&!(route==='users'&&isSuper()))route=firstAllowedRoute();
  ROUTE=route;location.hash=route;renderNav();render();toggleMenu(false);
  document.getElementById('view').scrollTop=0;}

/* ---------- language / theme ---------- */
function setLang(l){LANG=l;localStorage.setItem('farouk_lang',l);applyChrome();renderNav();render();}
function toggleTheme(){THEME=THEME==='dark'?'light':'dark';localStorage.setItem('farouk_theme',THEME);applyChrome();render();}
function applyChrome(){
  document.documentElement.lang=LANG;document.documentElement.dir=LANG==='ar'?'rtl':'ltr';
  document.body.dir=LANG==='ar'?'rtl':'ltr';
  document.documentElement.setAttribute('data-theme',THEME);
  const bl=document.getElementById('brandLogo');if(bl&&!bl.innerHTML)bl.innerHTML=LOGO_SVG;
  document.getElementById('langAr').classList.toggle('on',LANG==='ar');
  document.getElementById('langEn').classList.toggle('on',LANG==='en');
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.getAttribute('data-t')));
  document.getElementById('pageTitle').textContent=t(ROUTE);
  document.getElementById('pageSub').textContent=t(ROUTE+'_sub');
  renderTopbarUser();
}
function renderTopbarUser(){
  if(!USER)return;
  const bs=document.getElementById('branchSlot'),us=document.getElementById('userSlot');
  if(bs){
    if(isSuper()){
      bs.innerHTML=`<div class="branch-chip">${icon('truck')}
        <select onchange="setBranch(this.value)">${APP.branches.map(b=>`<option value="${b.id}" ${b.id===APP.active.branch?'selected':''}>${esc(b.name)}</option>`).join('')}</select></div>`;
    } else {
      bs.innerHTML=`<div class="branch-chip" title="${t('branch')}">${icon('truck')}<span>${esc(branchName(APP.active.branch))}</span></div>`;
    }
  }
  if(us){
    const initials=(USER.name||USER.username||'?').trim().charAt(0);
    const cloud=(typeof CLOUD!=='undefined'&&CLOUD.on)
      ?`<span class="badge" style="background:var(--greenbg);color:var(--green);border-color:transparent" title="${t('cloud_mode')}">● ${t('cloud_badge')}</span>`:'';
    us.innerHTML=`${cloud}<div class="user-chip"><div style="line-height:1.15;text-align:${LANG==='ar'?'right':'left'}">
        <div>${esc(USER.name||USER.username)}</div><div class="ro">${USER.role==='super'?t('super_admin'):USER.role==='entry'?t('data_entry'):t('branch_user')}</div></div>
      <div class="av">${esc(initials)}</div>
      <button class="x" title="${t('logout')}" onclick="logout()">${icon('logout')}</button></div>`;
  }
}
function toggleMenu(force){
  const sb=document.getElementById('sidebar'),bd=document.getElementById('backdrop');
  const open=force===undefined?!sb.classList.contains('open'):force;
  sb.classList.toggle('open',open);bd.classList.toggle('show',open);
}

/* ---------- chart helper ---------- */
let CHARTS=[];
function destroyCharts(){CHARTS.forEach(c=>{try{c.destroy();}catch(e){}});CHARTS=[];}
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}
function mkChart(id,cfg){
  const el=document.getElementById(id);if(!el)return;
  if(typeof Chart==='undefined'){
    const box=el.closest('.chart-box');
    if(box)box.innerHTML='<div class="empty" style="padding:30px">'+t('no_data')+'<div class="hint">'+(LANG==='ar'?'تعذّر تحميل مكتبة الرسوم (تحتاج اتصالاً بالإنترنت).':'Chart library could not load (needs an internet connection).')+'</div></div>';
    return;}
  const grid=css('--line'),txt=css('--txt2');
  Chart.defaults.font.family=LANG==='ar'?'Cairo':'Inter';
  Chart.defaults.color=txt;
  cfg.options=cfg.options||{};
  cfg.options.responsive=true;cfg.options.maintainAspectRatio=false;
  cfg.options.plugins=cfg.options.plugins||{};
  cfg.options.plugins.legend=cfg.options.plugins.legend||{labels:{usePointStyle:true,boxWidth:8,padding:14,font:{size:12}}};
  if(cfg.options.scales){for(const k in cfg.options.scales){
    cfg.options.scales[k].grid={color:grid,drawBorder:false};
    cfg.options.scales[k].ticks=Object.assign({color:txt,font:{size:11}},cfg.options.scales[k].ticks||{});
  }}
  CHARTS.push(new Chart(el,cfg));
}
const PAL={gold:'#c8a44a',green:'#3ec28f',blue:'#5aa9f0',red:'#f27272',violet:'#9d7cf0',amber:'#e8b451'};

/* ---------- ordered month helper for monthly closings ---------- */
const MONTH_ORDER=['4-2026','5-2026','6-2026','7-2025','8-2025','8-2025  (2)'];
function monthlyLabel(sheet){
  // sheets named like '7-2025' actually represent تقفيل شهر; use title if present
  const m=DB.monthly.find(x=>x.sheet===sheet);
  if(m&&m.title)return m.title;
  return sheet;
}

/* ============================================================
   VIEWS
   ============================================================ */
function render(){
  destroyCharts();
  applyChrome();
  const v=document.getElementById('view');
  const fn=VIEWS[ROUTE]||VIEWS.dashboard;
  v.classList.remove('anim');
  v.innerHTML=fn();
  // retrigger entrance animation
  void v.offsetWidth; v.classList.add('anim');
  animateCounters(v);
  if(AFTER[ROUTE])AFTER[ROUTE]();
}
const VIEWS={}, AFTER={};

/* keyboard & lifecycle wired at bottom */

/* ============================================================
   CORE: multi-branch data model + users/roles + session
   Prototype only — auth & storage are browser-local, not secure.
   ============================================================ */
const APP_KEY='farouk_app_v4';   // bumped → applies real branch names, starts clean
const BRANCH_NAMES=['صقر (الرئيسي)','السلام','ادكو','مرغم اسكندريه','مهندسين','الساحل'];
const BRANCH_COUNT=BRANCH_NAMES.length;

function defaultSettings(){
  return {prices:{p92:22.25,p95:24,solar:20.5}, commission:{benzeneRate:0.5143,solarRate:0.358},
    egpc:{p92:0.5503,p95:0.671,solar:0.3811,percent:0.30,tax:0.02},
    openingStock:{p92:'',p95:'',solar:''},
    channelOpening:{bank:'',petroapp:'',octane:'',petropay:''},
    supplierName:'أولى إنرجي', supplierOpening:''};
}
function egpcSettings(){const s=branchSettings();if(!s.egpc)s.egpc={p92:0.5503,p95:0.671,solar:0.3811,percent:0.30,tax:0.02};return s.egpc;}
function emptyBranch(){
  return {
    items:[],opening:[],movements:[],monthly:[],tanks:[],
    commission_months:[],incentive:[],sales_matrix:[],
    channels:{petroapp:[],octane:[],petropay:[]},channel_openings:{},channel_totals:{},
    supplier:{name:'',carried:null,rows:[]},
    shift_template:SEED.shift_template,
    settings:defaultSettings(),
    partners:[], partnerTxns:[],
    channelManual:[], supplierEntries:[], digitalEntries:[], ledgerManual:[],
    shifts:[], monthlyEntries:[], images:[]
  };
}
function seedBranch1(){
  const b=JSON.parse(JSON.stringify(SEED));
  b.shifts=[]; b.monthlyEntries=[]; b.images=[];
  b.settings=defaultSettings();
  return b;
}
function branchSettings(){if(!DB.settings)DB.settings=defaultSettings();return DB.settings;}
function freshAPP(){
  const branches=[];
  for(let i=1;i<=BRANCH_COUNT;i++)branches.push({id:'b'+i,name:BRANCH_NAMES[i-1]||('فرع '+i)});
  const data={};
  branches.forEach((br)=>{data[br.id]= emptyBranch();});  // clean start — all branches empty
  return {
    v:4,
    users:[{id:'u1',username:'barmas',password:'allah ma7ba',role:'super',name:'برماس',branchId:null}],
    branches, data,
    active:{branch:'b1'},
    session:{userId:null}
  };
}
function loadAPP(){
  try{const raw=localStorage.getItem(APP_KEY);if(raw){const a=JSON.parse(raw);if(a&&a.v===4)return migrate(a);}}catch(e){}
  try{localStorage.removeItem('farouk_app_v2');localStorage.removeItem('farouk_app_v3');}catch(e){}  // clean up old data
  return freshAPP();
}
function migrate(a){
  // ensure every branch dataset has all keys (forward-compat)
  const tpl=emptyBranch();
  a.branches.forEach(br=>{
    a.data[br.id]=a.data[br.id]||emptyBranch();
    for(const k in tpl)if(a.data[br.id][k]===undefined)a.data[br.id][k]=JSON.parse(JSON.stringify(tpl[k]));
  });
  return a;
}
function saveAPP(){try{localStorage.setItem(APP_KEY,JSON.stringify(APP));}catch(e){
  toast(LANG==='ar'?'تعذّر الحفظ (مساحة التخزين ممتلئة — جرّب صوراً أقل)':'Save failed (storage full — try fewer images)','err');}}

/* DB = active branch dataset */
function syncDB(){DB=APP.data[APP.active.branch];}
function saveDB(){saveAPP();}
function resetDB(){
  // reset ACTIVE branch data to empty
  APP.data[APP.active.branch]=emptyBranch();
  syncDB();saveAPP();
}
function resetAll(){try{localStorage.removeItem(APP_KEY);}catch(e){}APP=freshAPP();USER=null;syncDB();}

/* ---------- auth ---------- */
function currentUser(){return APP.users.find(u=>u.id===APP.session.userId)||null;}
function login(username,password){
  const u=APP.users.find(x=>x.username===String(username).trim()&&x.password===String(password));
  if(!u)return false;
  APP.session.userId=u.id;USER=u;
  if(u.role==='branch'&&u.branchId)APP.active.branch=u.branchId;
  else APP.active.branch=APP.active.branch||'b1';
  syncDB();saveAPP();return true;
}
function logout(){APP.session.userId=null;USER=null;if(typeof CLOUD!=='undefined')CLOUD.on=false;if(!cloudConfigured())saveAPP();showLogin();}
function isSuper(){return USER&&USER.role==='super';}
function canEdit(){return USER&&(USER.role==='super'||USER.role==='branch');} // manager/super edit; entry cannot
function allowedPages(){return (USER&&USER.role!=='super'&&Array.isArray(USER.pages)&&USER.pages.length)?USER.pages:null;}
function branchName(id){const b=APP.branches.find(x=>x.id===id);return b?b.name:id;}
function setBranch(id){
  if(!isSuper()&&USER.branchId!==id)return;
  APP.active.branch=id;syncDB();saveAPP();
  ROUTE=ROUTE; renderNav(); render();
}

/* ---------- user management (super only) ---------- */
function addUser(u){u.id='u'+Date.now();APP.users.push(u);saveAPP();}
function updateUser(id,patch){const u=APP.users.find(x=>x.id===id);if(u)Object.assign(u,patch);saveAPP();}
function deleteUser(id){APP.users=APP.users.filter(x=>x.id!==id);saveAPP();}
function renameBranch(id,name){const b=APP.branches.find(x=>x.id===id);if(b){b.name=name;saveAPP();}}

/* ============================================================
   SUPABASE CLOUD LAYER
   - config (project URL + anon key) stored locally
   - username/password login via SECURITY DEFINER RPC
   - loads branch data on login; mirrors writes back
   Falls back to local mode when not configured.
   ============================================================ */
const CLOUD_KEY='farouk_cloud_v1';
const SB_LIB='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
let CLOUD={on:false,sb:null,user:null,cfg:null};
const SQL_SCHEMA = `-- ============================================================
--  شركة الفاروق — Al Farouk | Supabase schema
--  شغّل السكربت ده مرة واحدة في:  Supabase → SQL Editor → New query → Run
--  Run this once in your Supabase project (SQL Editor).
-- ============================================================

-- 1) BRANCHES ------------------------------------------------
create table if not exists public.branches (
  id          text primary key,
  name        text not null,
  created_at  timestamptz default now()
);

-- 2) USERS (username + password, super admin manages) --------
create table if not exists public.app_users (
  id          uuid primary key default gen_random_uuid(),
  username    text unique not null,
  password    text not null,            -- prototype: plain; move to hashing/Supabase Auth before production
  role        text not null default 'branch',   -- 'super' | 'branch' (manager) | 'entry'
  branch_id   text references public.branches(id) on delete set null,
  name        text,
  pages       jsonb,                             -- allowed nav keys, null = all
  created_at  timestamptz default now()
);
alter table public.app_users add column if not exists pages jsonb;

-- 3) PER-BRANCH SETTINGS (prices + commission) ---------------
create table if not exists public.settings (
  branch_id    text primary key references public.branches(id) on delete cascade,
  prices       jsonb not null default '{"p92":22.25,"p95":24,"solar":20.5}',
  commission   jsonb not null default '{"benzeneRate":0.5143,"solarRate":0.358}',
  egpc         jsonb not null default '{"p92":0.5503,"p95":0.671,"solar":0.3811,"percent":0.30,"tax":0.02}',
  partners     jsonb not null default '[]',
  partner_txns jsonb not null default '[]',
  updated_at   timestamptz default now()
);
-- (if settings already existed, add the new columns)
alter table public.settings add column if not exists egpc          jsonb not null default '{"p92":0.5503,"p95":0.671,"solar":0.3811,"percent":0.30,"tax":0.02}';
alter table public.settings add column if not exists opening_stock jsonb not null default '{"p92":"","p95":"","solar":""}';
alter table public.settings add column if not exists partners      jsonb not null default '[]';
alter table public.settings add column if not exists partner_txns  jsonb not null default '[]';
alter table public.settings add column if not exists channel_opening jsonb not null default '{}';
alter table public.settings add column if not exists channel_manual  jsonb not null default '[]';
alter table public.settings add column if not exists supplier_entries jsonb not null default '[]';
alter table public.settings add column if not exists digital_entries  jsonb not null default '[]';
alter table public.settings add column if not exists ledger_manual    jsonb not null default '[]';
alter table public.settings add column if not exists supplier_name  text default 'أولى إنرجي';
alter table public.settings add column if not exists supplier_opening numeric default 0;

-- 4) DAILY SHIFTS --------------------------------------------
create table if not exists public.shifts (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  shift_date  date,
  data        jsonb not null,
  created_at  timestamptz default now()
);
create index if not exists shifts_branch_idx on public.shifts(branch_id);

-- 5) MONTHLY ENTRIES (manual) --------------------------------
create table if not exists public.monthly_entries (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  data        jsonb not null,
  created_at  timestamptz default now()
);
create index if not exists monthly_branch_idx on public.monthly_entries(branch_id);

-- 6) BRANCH PHOTOS -------------------------------------------
create table if not exists public.images (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  name        text,
  data        text not null,            -- base64 data URL
  created_at  timestamptz default now()
);
create index if not exists images_branch_idx on public.images(branch_id);

-- 7) SEED: 13 branches + super admin --------------------------
insert into public.branches (id, name) values
 ('b1','صقر (الرئيسي)'),('b2','السلام'),('b3','ادكو'),
 ('b4','مرغم اسكندريه'),('b5','مهندسين'),('b6','الساحل')
on conflict (id) do nothing;

insert into public.app_users (username, password, role, name)
 values ('barmas','allah ma7ba','super','برماس')
on conflict (username) do nothing;

insert into public.settings (branch_id)
 select id from public.branches on conflict (branch_id) do nothing;

-- ============================================================
-- 8) ROW LEVEL SECURITY
--    Passwords are hidden (no direct read of app_users).
--    Login & user management go through SECURITY DEFINER RPCs.
--    Data tables are open to the anon key so the app works;
--    branch isolation is enforced in the app. For production
--    multi-tenant security, move to Supabase Auth + per-row policies.
-- ============================================================
alter table public.app_users       enable row level security;  -- locked (no policies = no anon access)
alter table public.branches        enable row level security;
alter table public.settings        enable row level security;
alter table public.shifts          enable row level security;
alter table public.monthly_entries enable row level security;
alter table public.images          enable row level security;

-- open policies for data tables (functional prototype)
drop policy if exists p_branches on public.branches;
create policy p_branches on public.branches for all using (true) with check (true);
drop policy if exists p_settings on public.settings;
create policy p_settings on public.settings for all using (true) with check (true);
drop policy if exists p_shifts on public.shifts;
create policy p_shifts on public.shifts for all using (true) with check (true);
drop policy if exists p_monthly on public.monthly_entries;
create policy p_monthly on public.monthly_entries for all using (true) with check (true);
drop policy if exists p_images on public.images;
create policy p_images on public.images for all using (true) with check (true);
-- NOTE: app_users has RLS enabled and NO policy → the anon key cannot read it.

-- ============================================================
-- 9) RPCs (run as owner, bypass RLS safely)
-- ============================================================
create or replace function public.app_login(p_username text, p_password text)
returns table(id uuid, username text, role text, branch_id text, name text, pages jsonb)
language sql security definer set search_path = public as $$
  select id, username, role, branch_id, name, pages
  from public.app_users
  where username = p_username and password = p_password
  limit 1;
$$;

create or replace function public.app_list_users()
returns table(id uuid, username text, password text, role text, branch_id text, name text, pages jsonb)
language sql security definer set search_path = public as $$
  select id, username, password, role, branch_id, name, pages from public.app_users order by created_at;
$$;

create or replace function public.app_add_user(p_username text, p_password text, p_role text, p_branch text, p_name text, p_pages jsonb default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  insert into public.app_users(username,password,role,branch_id,name,pages)
  values (p_username,p_password,p_role,nullif(p_branch,''),p_name,p_pages) returning id into new_id;
  return new_id;
end; $$;

create or replace function public.app_update_user(p_id uuid, p_username text, p_password text, p_role text, p_branch text, p_name text, p_pages jsonb default null)
returns void language sql security definer set search_path = public as $$
  update public.app_users set username=p_username, password=p_password, role=p_role,
    branch_id=nullif(p_branch,''), name=p_name, pages=p_pages where id=p_id;
$$;

create or replace function public.app_delete_user(p_id uuid)
returns void language sql security definer set search_path = public as $$
  delete from public.app_users where id=p_id;
$$;

-- allow the anon key to call these RPCs
grant execute on function public.app_login(text,text)                              to anon;
grant execute on function public.app_list_users()                                  to anon;
grant execute on function public.app_add_user(text,text,text,text,text,jsonb)       to anon;
grant execute on function public.app_update_user(uuid,text,text,text,text,text,jsonb) to anon;
grant execute on function public.app_delete_user(uuid)                             to anon;

-- done ✓
`;

function loadCloudCfg(){
  // 1) env (Vite .env.local → window.FAROUK_ENV) takes priority
  try{const e=window.FAROUK_ENV;if(e&&e.url&&e.key)return {url:String(e.url).replace(/\/$/,''),key:e.key};}catch(x){}
  // 2) otherwise the in-app setup screen config
  try{const r=localStorage.getItem(CLOUD_KEY);if(r)return JSON.parse(r);}catch(e){}return null;}
function saveCloudCfg(cfg){try{localStorage.setItem(CLOUD_KEY,JSON.stringify(cfg));}catch(e){}CLOUD.cfg=cfg;}
function clearCloudCfg(){try{localStorage.removeItem(CLOUD_KEY);}catch(e){}CLOUD={on:false,sb:null,user:null,cfg:null};}
function cloudConfigured(){return !!(CLOUD.cfg&&CLOUD.cfg.url&&CLOUD.cfg.key);}
function genId(){try{if(crypto&&crypto.randomUUID)return crypto.randomUUID();}catch(e){}return 'id'+Date.now()+Math.random().toString(16).slice(2);}
function cloudErr(e){console.error('cloud',e);toast((LANG==='ar'?'خطأ سحابة: ':'Cloud error: ')+((e&&e.message)||e),'err');}

function loadSupabaseLib(){
  return new Promise((res,rej)=>{
    if(window.supabase&&window.supabase.createClient)return res();
    const s=document.createElement('script');s.src=SB_LIB;
    s.onload=()=>res();s.onerror=()=>rej(new Error(LANG==='ar'?'تعذّر تحميل مكتبة Supabase (تأكد من الإنترنت)':'Could not load Supabase library (check internet)'));
    document.head.appendChild(s);
  });
}
async function cloudInit(){
  if(!cloudConfigured())return false;
  await loadSupabaseLib();
  CLOUD.sb=window.supabase.createClient(CLOUD.cfg.url,CLOUD.cfg.key);
  return true;
}
async function cloudTest(url,key){
  await loadSupabaseLib();
  const sb=window.supabase.createClient(url,key);
  const {error}=await sb.from('branches').select('id').limit(1);
  if(error)throw error;
  return true;
}
async function cloudLogin(username,password){
  const {data,error}=await CLOUD.sb.rpc('app_login',{p_username:String(username).trim(),p_password:String(password)});
  if(error)throw error;
  return (data&&data.length)?data[0]:null;
}
async function cloudLoadAll(user){
  const sb=CLOUD.sb;
  const {data:branches,error:be}=await sb.from('branches').select('*').order('id');if(be)throw be;
  const visible = user.role==='super'?branches:branches.filter(b=>b.id===user.branch_id);
  APP.branches=visible.map(b=>({id:b.id,name:b.name}));
  const {data:sets}=await sb.from('settings').select('*');
  const setMap={};(sets||[]).forEach(s=>setMap[s.branch_id]=s);
  APP.data={};
  visible.forEach(b=>{const d=emptyBranch();const st=setMap[b.id];
    if(st){d.settings={prices:st.prices,commission:st.commission,egpc:st.egpc||undefined,openingStock:st.opening_stock||undefined,
        channelOpening:st.channel_opening||undefined,supplierName:st.supplier_name||'أولى إنرجي',supplierOpening:st.supplier_opening||''};
      d.partners=st.partners||[];d.partnerTxns=st.partner_txns||[];
      d.channelManual=st.channel_manual||[];d.supplierEntries=st.supplier_entries||[];d.digitalEntries=st.digital_entries||[];d.ledgerManual=st.ledger_manual||[];}
    APP.data[b.id]=d;});
  const ids=visible.map(b=>b.id);
  if(ids.length){
    const {data:shifts}=await sb.from('shifts').select('*').in('branch_id',ids);
    (shifts||[]).forEach(r=>{const d=APP.data[r.branch_id];if(d){const o=r.data||{};o._id=r.id;d.shifts.push(o);}});
    const {data:mon}=await sb.from('monthly_entries').select('*').in('branch_id',ids);
    (mon||[]).forEach(r=>{const d=APP.data[r.branch_id];if(d){const o=r.data||{};o._id=r.id;d.monthlyEntries.push(o);}});
    const {data:imgs}=await sb.from('images').select('*').in('branch_id',ids);
    (imgs||[]).forEach(r=>{const d=APP.data[r.branch_id];if(d)d.images.push({_id:r.id,name:r.name,data:r.data,date:(r.created_at||'').slice(0,10)});});
  }
  if(user.role==='super'){
    const {data:us}=await sb.rpc('app_list_users');
    APP.users=(us||[]).map(u=>({id:u.id,username:u.username,password:u.password,role:u.role,branchId:u.branch_id,name:u.name,pages:u.pages||null}));
  } else APP.users=[];
  Object.keys(APP.data).forEach(bid=>APP.data[bid].shifts.sort((a,b)=>(a.date||'').localeCompare(b.date||'')));
  APP.active.branch = user.role==='super'?(visible[0]?visible[0].id:'b1'):user.branch_id;
  CLOUD.user={id:user.id,username:user.username,role:user.role,branchId:user.branch_id,name:user.name};
  CLOUD.on=true;
}

/* mirror writes (best-effort, local stays source of truth for UI) */
async function cloudSaveShift(branchId,shift){try{if(!shift._id)shift._id=genId();
  const {error}=await CLOUD.sb.from('shifts').upsert({id:shift._id,branch_id:branchId,shift_date:shift.date||null,data:shift});if(error)throw error;}catch(e){cloudErr(e);}}
async function cloudDeleteShift(id){try{if(id)await CLOUD.sb.from('shifts').delete().eq('id',id);}catch(e){cloudErr(e);}}
async function cloudSaveMonthly(branchId,m){try{if(!m._id)m._id=genId();
  const {error}=await CLOUD.sb.from('monthly_entries').upsert({id:m._id,branch_id:branchId,data:m});if(error)throw error;}catch(e){cloudErr(e);}}
async function cloudSaveSettings(branchId,s){try{
  const d=APP.data[branchId]||{};
  await CLOUD.sb.from('settings').upsert({branch_id:branchId,prices:s.prices,commission:s.commission,egpc:s.egpc||null,
    opening_stock:s.openingStock||null,channel_opening:s.channelOpening||{},supplier_name:s.supplierName||'أولى إنرجي',
    supplier_opening:n(s.supplierOpening)||0,channel_manual:d.channelManual||[],supplier_entries:d.supplierEntries||[],digital_entries:d.digitalEntries||[],ledger_manual:d.ledgerManual||[],
    partners:d.partners||[],partner_txns:d.partnerTxns||[],updated_at:new Date().toISOString()});
}catch(e){cloudErr(e);}}
async function cloudSaveImage(branchId,img){try{if(!img._id)img._id=genId();
  await CLOUD.sb.from('images').upsert({id:img._id,branch_id:branchId,name:img.name,data:img.data});}catch(e){cloudErr(e);}}
async function cloudDeleteImage(id){try{if(id)await CLOUD.sb.from('images').delete().eq('id',id);}catch(e){cloudErr(e);}}
async function cloudAddUser(u){const {data,error}=await CLOUD.sb.rpc('app_add_user',{p_username:u.username,p_password:u.password,p_role:u.role,p_branch:u.branchId||'',p_name:u.name||'',p_pages:u.pages||null});if(error)throw error;u.id=data;return data;}
async function cloudUpdateUser(id,u){const {error}=await CLOUD.sb.rpc('app_update_user',{p_id:id,p_username:u.username,p_password:u.password,p_role:u.role,p_branch:u.branchId||'',p_name:u.name||'',p_pages:u.pages||null});if(error)throw error;}
async function cloudDeleteUser(id){const {error}=await CLOUD.sb.rpc('app_delete_user',{p_id:id});if(error)throw error;}
async function cloudRenameBranch(id,name){try{await CLOUD.sb.from('branches').update({name}).eq('id',id);}catch(e){cloudErr(e);}}

/* ---------- setup modal ---------- */
function cloudSetupModal(){
  const cfg=CLOUD.cfg||{url:'',key:''};
  const body=`
    <div class="note" style="margin-bottom:14px">${icon('truck')}<div>${t('cloud_intro')}</div></div>
    <div class="field"><label>Project URL</label><input id="cl_url" placeholder="https://xxxx.supabase.co" value="${esc(cfg.url||'')}"></div>
    <div class="field"><label>anon public key</label><input id="cl_key" placeholder="eyJhbGciOi..." value="${esc(cfg.key||'')}"></div>
    <div id="cl_status" style="font-size:12.5px;font-weight:600;margin:6px 0 12px"></div>
    <details style="margin-top:8px"><summary style="cursor:pointer;font-weight:700;color:var(--brand2)">${t('cloud_sql_show')}</summary>
      <div class="hint" style="margin:8px 0">${t('cloud_sql_hint')}</div>
      <textarea id="cl_sql" readonly style="width:100%;height:160px;font-family:monospace;font-size:11px;background:var(--bg2);color:var(--txt);border:1px solid var(--line2);border-radius:8px;padding:10px">${esc(SQL_SCHEMA)}</textarea>
      <button class="btn btn-sm" style="margin-top:8px" onclick="navigator.clipboard&&navigator.clipboard.writeText(document.getElementById('cl_sql').value);toast('${t('saved')}')">${t('cloud_copy_sql')}</button>
    </details>
    <div class="hint" style="margin-top:12px">${t('cloud_guide')}</div>`;
  modal(t('cloud_setup'),body,
    `${cloudConfigured()?`<button class="btn btn-ghost btn-danger" onclick="cloudDisconnect()">${t('cloud_disconnect')}</button>`:''}
     <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="cloudConnect()">${t('cloud_connect')}</button>`);
}
async function cloudConnect(){
  const url=document.getElementById('cl_url').value.trim().replace(/\/$/,'');
  const key=document.getElementById('cl_key').value.trim();
  const st=document.getElementById('cl_status');
  if(!url||!key){st.style.color='var(--red)';st.textContent=t('cloud_need');return;}
  st.style.color='var(--txt2)';st.textContent=t('cloud_testing');
  try{
    await cloudTest(url,key);
    saveCloudCfg({url,key});await cloudInit();
    st.style.color='var(--green)';st.textContent=t('cloud_ok');
    toast(t('cloud_ok'));setTimeout(()=>{closeModal();logout();},700);
  }catch(e){st.style.color='var(--red)';st.textContent=(t('cloud_fail')+' '+((e&&e.message)||e));}
}
function cloudDisconnect(){clearCloudCfg();toast(t('cloud_disconnected'));closeModal();logout();}

/* ============================================================
   VIEW MODULES
   ============================================================ */

function kpi(lbl,val,ic,icClass,cur,delta,raw,dec,suf){
  // if raw numeric provided, animate count-up (unless reduced motion)
  let valHTML;
  if(raw!==undefined&&raw!==null&&!isNaN(parseFloat(raw))&&!reducedMotion()){
    valHTML=`<span data-count="${parseFloat(raw)}" data-dec="${dec||0}" data-suf="${suf||''}">0${suf||''}</span>`;
  } else valHTML=val;
  return `<div class="card kpi"><div class="lbl"><span class="ic ${icClass}">${icon(ic)}</span>${lbl}</div>
    <div class="val num">${valHTML}${cur?` <span class="cur">${cur}</span>`:''}</div>
    ${delta?`<div class="dlt">${delta}</div>`:''}</div>`;
}
function printHead(subtitle){
  const d=new Date().toLocaleDateString('en-GB');
  return `<div class="print-head"><div class="pc">
    <div><h1>${t('company')}</h1><div style="font-size:13px;color:#555">${t('tagline')}</div></div>
    <div class="meta"><div><b>${esc(subtitle||'')}</b></div><div>${t('date')}: ${d}</div></div>
  </div></div>`;
}

/* ---------------- DASHBOARD ---------------- */
VIEWS.dashboard=function(){
  const sm=DB.sales_matrix||[];
  const inc=DB.incentive||[];
  const latestInc=inc.length?inc[inc.length-1]:null;
  // latest monthly closing (prefer 7-2025 sheet = يوليو, else first)
  const mclose=DB.monthly.find(m=>m.sheet==='7-2025')||DB.monthly[0];
  const capSummary=mclose?mclose.cap_summary:{};
  const totalCap=capSummary['اجمالي رأس المال'];
  const netCap=capSummary['صافي رأس المال'];
  const debt=capSummary['مديونية الشركة'];
  const supBal=DB.supplier&&DB.supplier.rows.length?DB.supplier.rows[DB.supplier.rows.length-1].balance:null;
  // fuel sales latest month from sales_matrix last row
  const lastSales=sm.length?sm[sm.length-1]:null;
  const lastSalesL=lastSales?(n(lastSales.solar)+n(lastSales.p92)+n(lastSales.p95)):0;
  const ch=DB.channel_totals||{};

  const EGP=' '+t('egp');
  let h=printHead(t('dashboard'));
  h+=`<div class="grid kpis">`;
  h+=kpi(t('gross_sales'),fmt(lastSalesL),'droplet','ic-b',t('liter'),lastSales?lastSales.month:'',lastSalesL,0,'');
  h+=kpi(t('month_incentive'),latestInc?money(latestInc.value):'—','award','ic-y','',latestInc?latestInc.month:'',latestInc?latestInc.value:null,0,EGP);
  h+=kpi(t('total_capital'),totalCap?money(totalCap):'—','trending','ic-g','',mclose?mclose.title:'',totalCap,0,EGP);
  h+=kpi(t('company_debt'),debt?money(debt):'—','truck','ic-r','','',debt,0,EGP);
  h+=kpi(t('net_capital'),netCap?money(netCap):'—','award','ic-v','','',netCap,0,EGP);
  h+=kpi(t('supplier_balance'),supBal!=null?money(supBal):'—','file','ic-b',DB.supplier?DB.supplier.name:'',supBal,0,EGP);
  h+=`</div>`;

  h+=`<div class="two-col" style="margin-top:16px">
    <div class="card"><div class="card-head"><h3>${t('sales_trend')}</h3></div>
      <div class="card-pad"><div class="chart-box"><canvas id="cTrend"></canvas></div></div></div>
    <div class="card"><div class="card-head"><h3>${t('product_mix')}</h3><span class="sub">${lastSales?lastSales.month:''}</span></div>
      <div class="card-pad"><div class="chart-box"><canvas id="cMix"></canvas></div></div></div>
  </div>`;

  h+=`<div class="two-col" style="margin-top:16px">
    <div class="card"><div class="card-head"><h3>${t('incentive_trend')}</h3></div>
      <div class="card-pad"><div class="chart-box sm"><canvas id="cInc"></canvas></div></div></div>
    <div class="card"><div class="card-head"><h3>${t('channel_summary')}</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>${t('channels')}</th><th class="t-num">${t('deposit')}</th><th class="t-num">${t('withdraw')}</th><th class="t-num">${t('fee')}</th></tr></thead><tbody>
      ${['petroapp','octane','petropay'].map(k=>`<tr><td>${t(k)}</td>
        <td class="t-num num">${fmt(ch[k]?ch[k].deposit:0)}</td>
        <td class="t-num num">${fmt(ch[k]?ch[k].withdraw:0)}</td>
        <td class="t-num num">${fmt(ch[k]?ch[k].fee:0)}</td></tr>`).join('')}
      </tbody></table></div></div>
  </div>`;

  // recent movements
  const recent=(DB.movements||[]).slice(-8).reverse();
  h+=`<div class="card" style="margin-top:16px"><div class="card-head"><h3>${t('recent_moves')}</h3>
    <span class="spacer"></span><a class="btn btn-sm btn-ghost" href="#inventory" onclick="go('inventory');return false">${t('inventory')} →</a></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th><th>${t('item')}</th><th>${t('type')}</th>
    <th class="t-num">${t('mv_in')}</th><th class="t-num">${t('mv_out')}</th><th class="t-num">${t('balance')}</th></tr></thead><tbody>
    ${recent.map(m=>`<tr><td class="num">${fmtDate(m.date)}</td><td>${esc(m.item)}</td>
      <td><span class="tag ${m.type==='اضافة'?'tag-in':'tag-out'}">${m.type==='اضافة'?t('mv_type_add'):t('mv_type_out')}</span></td>
      <td class="t-num num">${m['in']?fmt(m['in']):'—'}</td><td class="t-num num">${m.out?fmt(m.out):'—'}</td>
      <td class="t-num num">${fmt(m.balance)}</td></tr>`).join('')||`<tr><td colspan="6" class="empty">${t('no_data')}</td></tr>`}
    </tbody></table></div></div>`;
  return h;
};
AFTER.dashboard=function(){
  const sm=DB.sales_matrix||[];
  const labels=sm.map(x=>x.month);
  mkChart('cTrend',{type:'line',
    data:{labels,datasets:[
      {label:t('p92'),data:sm.map(x=>n(x.p92)),borderColor:PAL.gold,backgroundColor:'transparent',tension:.35,borderWidth:2.5,pointRadius:2},
      {label:t('p95'),data:sm.map(x=>n(x.p95)),borderColor:PAL.blue,backgroundColor:'transparent',tension:.35,borderWidth:2.5,pointRadius:2},
      {label:t('solar'),data:sm.map(x=>n(x.solar)),borderColor:PAL.green,backgroundColor:'transparent',tension:.35,borderWidth:2.5,pointRadius:2},
    ]},options:{scales:{y:{beginAtZero:true},x:{}}}});
  const last=sm.length?sm[sm.length-1]:{solar:0,p92:0,p95:0};
  mkChart('cMix',{type:'doughnut',
    data:{labels:[t('p92'),t('p95'),t('solar')],datasets:[{data:[n(last.p92),n(last.p95),n(last.solar)],
      backgroundColor:[PAL.gold,PAL.blue,PAL.green],borderWidth:0}]},
    options:{cutout:'62%'}});
  const inc=DB.incentive||[];
  mkChart('cInc',{type:'bar',
    data:{labels:inc.map(x=>x.month),datasets:[{label:t('incentive_value'),data:inc.map(x=>n(x.value)),
      backgroundColor:PAL.gold,borderRadius:6,maxBarThickness:34}]},
    options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true},x:{}}}});
};

/* ---------------- INVENTORY ---------------- */
let invTab='stock', invSearch='';
VIEWS.inventory=function(){
  const mv=DB.movements||[];
  const totIn=sum(mv,m=>m['in']), totOut=sum(mv,m=>m.out);
  const op=DB.opening||[];
  const stockVal=sum(op,x=>x.cur_value);
  let h=printHead(t('inventory'));
  h+=`<div class="grid kpis">
    ${kpi(t('items_count'),fmt((DB.items||[]).length),'box','ic-y')}
    ${kpi(t('stock_value'),money(stockVal),'trending','ic-g')}
    ${kpi(t('total_in'),fmt(totIn),'upload','ic-b',t('liter'))}
    ${kpi(t('total_out'),fmt(totOut),'droplet','ic-r',t('liter'))}
  </div>`;
  h+=`<div class="seg no-print" style="margin:18px 0 14px">
    <button class="${invTab==='stock'?'on':''}" onclick="invTab='stock';render()">${t('current_stock')}</button>
    ${['movements','items_cat','opening_bal'].map(k=>`<button class="${invTab===k?'on':''}" onclick="invTab='${k}';render()">${t(k)}</button>`).join('')}
  </div>`;
  if(invTab==='stock'){
    const ss=stockSummary();
    h+=`<div class="note no-print" style="margin-bottom:16px">${icon('box')}<div>${t('stock_note')}</div></div>`;
    h+=`<div class="card"><div class="card-head"><h3>${t('current_stock')}</h3><span class="sub">${esc(branchName(APP.active.branch))}</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>${t('code')}</th><th>${t('item')}</th>
      <th class="t-num">${t('opening_stock')}</th><th class="t-num">${t('incoming_col')}</th><th class="t-num">${t('sold_col')}</th>
      <th class="t-num">${t('remaining')} (${t('liter')})</th></tr></thead><tbody>
      ${ss.map(r=>`<tr><td class="num">${r.code}</td><td>${esc(r.name)}</td>
        <td class="t-num num">${fmt(r.open,0)}</td><td class="t-num num pos">${fmt(r.inc,0)}</td>
        <td class="t-num num neg">${fmt(r.sold,0)}</td>
        <td class="t-num num" style="font-weight:800;color:${r.cur<0?'var(--red)':'var(--brand2)'}">${fmt(r.cur,0)}</td></tr>`).join('')}
      </tbody></table></div></div>`;
    h+=`<div class="card card-pad no-print" style="margin-top:16px">
      <div class="sect-head" style="margin-top:0"><h3>${t('opening_stock_title')}</h3></div>
      <div class="form-grid">
        <div class="field"><label>بنزين 92 (code 1)</label><input type="number" step="any" value="${openingStock().p92}" oninput="setOpenStock('p92',this.value)"></div>
        <div class="field"><label>بنزين 95 (code 2)</label><input type="number" step="any" value="${openingStock().p95}" oninput="setOpenStock('p95',this.value)"></div>
        <div class="field"><label>سولار (code 3)</label><input type="number" step="any" value="${openingStock().solar}" oninput="setOpenStock('solar',this.value)"></div>
      </div></div>`;
  } else if(invTab==='movements'){
    const rows=mv.filter(m=>!invSearch||(m.item||'').includes(invSearch)||(m.permit||'').includes(invSearch));
    h+=`<div class="toolbar no-print">
      <div class="search">${icon('file')}<input placeholder="${t('search')}" value="${esc(invSearch)}" oninput="invSearch=this.value;render();focusEnd(this)"></div>
      <span class="spacer"></span>
      <button class="btn btn-primary" onclick="editMove(-1)">${icon('upload')} ${t('add')}</button>
      <button class="btn" onclick="exportCSV('movements')">${t('export_csv')}</button>
      <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
    h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr>
      <th>${t('date')}</th><th>${t('permit')}</th><th>${t('type')}</th><th>${t('item')}</th><th>${t('code')}</th>
      <th class="t-num">${t('mv_in')}</th><th class="t-num">${t('mv_out')}</th><th class="t-num">${t('balance')}</th>
      <th class="no-print"></th></tr></thead><tbody>
      ${rows.map((m,i)=>`<tr><td class="num">${fmtDate(m.date)}</td><td class="num">${esc(m.permit)||'—'}</td>
        <td><span class="tag ${m.type==='اضافة'?'tag-in':'tag-out'}">${m.type==='اضافة'?t('mv_type_add'):t('mv_type_out')}</span></td>
        <td>${esc(m.item)}</td><td class="num">${esc(m.code)}</td>
        <td class="t-num num">${m['in']?fmt(m['in']):'—'}</td><td class="t-num num">${m.out?fmt(m.out):'—'}</td>
        <td class="t-num num">${fmt(m.balance)}</td>
        <td class="no-print"><button class="btn btn-sm btn-ghost" onclick="editMove(${mv.indexOf(m)})">${t('edit')}</button>
        <button class="btn btn-sm btn-ghost btn-danger" onclick="delMove(${mv.indexOf(m)})">${t('del')}</button></td></tr>`).join('')
        ||`<tr><td colspan="9" class="empty">${t('no_data')}</td></tr>`}
      </tbody><tfoot><tr><td colspan="5">${t('total')}</td>
      <td class="t-num num">${fmt(sum(rows,m=>m['in']))}</td><td class="t-num num">${fmt(sum(rows,m=>m.out))}</td><td></td><td class="no-print"></td></tr></tfoot>
      </table></div></div>`;
  } else if(invTab==='items_cat'){
    const items=(DB.items||[]).filter(x=>!invSearch||(x.name||'').includes(invSearch)||(x.code||'').includes(invSearch));
    h+=`<div class="toolbar no-print"><div class="search">${icon('file')}<input placeholder="${t('search')}" value="${esc(invSearch)}" oninput="invSearch=this.value;render();focusEnd(this)"></div>
      <span class="spacer"></span><button class="btn" onclick="exportCSV('items')">${t('export_csv')}</button></div>`;
    h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('code')}</th><th>${t('item')}</th>
      <th>${t('group')}</th><th>${t('supplier_f')}</th><th class="t-num">${t('price')}</th></tr></thead><tbody>
      ${items.map(x=>`<tr><td class="num">${esc(x.code)}</td><td>${esc(x.name)}</td><td class="num">${esc(x.group)||'—'}</td>
        <td>${esc(x.supplier)||'—'}</td><td class="t-num num">${x.price!=null?money(x.price):'—'}</td></tr>`).join('')
        ||`<tr><td colspan="5" class="empty">${t('no_data')}</td></tr>`}
      </tbody></table></div></div>`;
  } else {
    const op2=(DB.opening||[]).filter(x=>!invSearch||(x.name||'').includes(invSearch));
    h+=`<div class="toolbar no-print"><div class="search">${icon('file')}<input placeholder="${t('search')}" value="${esc(invSearch)}" oninput="invSearch=this.value;render();focusEnd(this)"></div>
      <span class="spacer"></span><button class="btn" onclick="exportCSV('opening')">${t('export_csv')}</button>
      <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
    h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('code')}</th><th>${t('item')}</th>
      <th class="t-num">${t('open_qty')}</th><th class="t-num">${t('cost')}</th><th class="t-num">${t('open_value')}</th>
      <th class="t-num">${t('cur_qty')}</th><th class="t-num">${t('cur_value')}</th><th>${t('supplier_f')}</th></tr></thead><tbody>
      ${op2.map(x=>`<tr><td class="num">${esc(x.code)}</td><td>${esc(x.name)}</td>
        <td class="t-num num">${fmt(x.open_qty)}</td><td class="t-num num">${fmt(x.cost)}</td>
        <td class="t-num num">${fmt(x.open_value)}</td><td class="t-num num">${fmt(x.cur_qty)}</td>
        <td class="t-num num">${fmt(x.cur_value)}</td><td>${esc(x.supplier)||'—'}</td></tr>`).join('')
        ||`<tr><td colspan="8" class="empty">${t('no_data')}</td></tr>`}
      </tbody><tfoot><tr><td colspan="4">${t('total')}</td><td class="t-num num">${fmt(sum(op2,x=>x.open_value))}</td>
      <td></td><td class="t-num num">${fmt(sum(op2,x=>x.cur_value))}</td><td></td></tr></tfoot></table></div></div>`;
  }
  return h;
};
function focusEnd(inp){const v=inp.value;setTimeout(()=>{const e=document.querySelector('.search input');if(e){e.focus();e.setSelectionRange(v.length,v.length);}},0);}

function editMove(i){
  const mv=DB.movements;const m=i>=0?mv[i]:{date:new Date().toISOString().slice(0,10),permit:'',type:'اضافة',code:'',item:'','in':'',out:'',balance:'',note:'',price:''};
  const items=DB.items||[];
  const body=`<div class="form-grid">
    <div class="field"><label>${t('date')}</label><input id="f_date" type="date" value="${esc(m.date||'')}"></div>
    <div class="field"><label>${t('permit')}</label><input id="f_permit" value="${esc(m.permit||'')}"></div>
    <div class="field"><label>${t('type')}</label><select id="f_type">
      <option value="اضافة" ${m.type==='اضافة'?'selected':''}>${t('mv_type_add')}</option>
      <option value="صرف" ${m.type==='صرف'?'selected':''}>${t('mv_type_out')}</option></select></div>
    <div class="field"><label>${t('item')}</label><input id="f_item" list="itemlist" value="${esc(m.item||'')}">
      <datalist id="itemlist">${items.map(x=>`<option value="${esc(x.name)}" data-code="${esc(x.code)}">`).join('')}</datalist></div>
    <div class="field"><label>${t('code')}</label><input id="f_code" value="${esc(m.code||'')}"></div>
    <div class="field"><label>${t('mv_in')}</label><input id="f_in" type="number" step="any" value="${m['in']==null?'':m['in']}"></div>
    <div class="field"><label>${t('mv_out')}</label><input id="f_out" type="number" step="any" value="${m.out==null?'':m.out}"></div>
    <div class="field"><label>${t('balance')}</label><input id="f_bal" type="number" step="any" value="${m.balance==null?'':m.balance}"></div>
  </div><div class="field"><label>${t('notes')}</label><input id="f_note" value="${esc(m.note||'')}"></div>`;
  modal(i>=0?t('edit'):t('add'),body,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="saveMove(${i})">${t('save')}</button>`);
}
function saveMove(i){
  const g=id=>document.getElementById(id).value;
  const rec={date:g('f_date'),permit:g('f_permit'),type:g('f_type'),item:g('f_item'),code:g('f_code'),
    'in':g('f_in')===''?null:n(g('f_in')),out:g('f_out')===''?null:n(g('f_out')),
    balance:g('f_bal')===''?null:n(g('f_bal')),note:g('f_note'),party:'',price:null};
  if(!rec.item){toast(t('item')+' ?','err');return;}
  if(i>=0)DB.movements[i]=Object.assign(DB.movements[i],rec);else DB.movements.push(rec);
  saveDB();closeModal();toast(t('saved'));render();
}
function delMove(i){if(!confirm(t('confirm_del')))return;DB.movements.splice(i,1);saveDB();toast(t('deleted'));render();}

/* ---------------- SHIFTS (editable, localStorage) ---------------- */
VIEWS.shifts=function(){
  const sh=DB.shifts||[];
  let h=printHead(t('shifts'));
  h+=`<div class="toolbar no-print"><button class="btn btn-primary" onclick="editShift(-1)">${icon('clock')} ${t('new_shift')}</button>
    <span class="spacer"></span>${sh.length?`<button class="btn" onclick="exportCSV('shifts')">${t('export_csv')}</button>`:''}</div>`;
  h+=`<div class="note no-print" style="margin-bottom:16px">${icon('file')}<div>${t('comm_formula').replace(/.*/,'')}${
     LANG==='ar'?'التقفيل يحسب: إجمالي المبيعات − المصروفات = الصافي، ثم الصافي + رصيد سابق = نقدية الخزينة، منها الإيداع بالبنك والباقي نقداً.'
               :'Closing computes: sales total − expenses = net; net + previous cash = treasury; of which bank deposit, remainder cash in hand.'}</div></div>`;
  if(!sh.length){h+=`<div class="card"><div class="empty">${icon('clock')}<div>${t('no_shifts')}</div></div></div>`;return h;}
  h+=`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">`;
  sh.slice().reverse().forEach((s)=>{
    const idx=sh.indexOf(s);
    const salesT=sum(s.sales||[],x=>x.amount);
    const expT=sum(s.expenses||[],x=>x.amount);
    const net=salesT-expT;
    const treasury=net+n(s.prev_cash);
    const cash=treasury-n(s.bank_deposit);
    h+=`<div class="card card-pad">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div style="font-weight:800;font-size:15px">${fmtDate(s.date)}</div>
        <div style="font-size:12px;color:var(--txt2)">${esc(s.lead||'')}</div></div>
        <div class="no-print"><button class="btn btn-sm btn-ghost" onclick="editShift(${idx})">${t('edit')}</button>
        <button class="btn btn-sm btn-ghost btn-danger" onclick="delShift(${idx})">${t('del')}</button></div></div>
      <table style="margin-top:12px;font-size:12.5px">
        <tr><td style="border:none;padding:4px 0">${t('shift_total')}</td><td class="t-num num" style="border:none;padding:4px 0">${money(salesT)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('expenses')}</td><td class="t-num num neg" style="border:none;padding:4px 0">${money(expT)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('net_after_exp')}</td><td class="t-num num" style="border:none;padding:4px 0;font-weight:800">${money(net)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('bank_deposit')}</td><td class="t-num num" style="border:none;padding:4px 0">${money(s.bank_deposit)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('cash_in_hand')}</td><td class="t-num num pos" style="border:none;padding:4px 0;font-weight:800">${money(cash)}</td></tr>
      </table></div>`;
  });
  h+=`</div>`;
  return h;
};
function editShift(i){
  const sh=DB.shifts;const products=(DB.shift_template&&DB.shift_template.products)||['بنزين 92','بنزين 95','سولار','زيوت'];
  const s=i>=0?JSON.parse(JSON.stringify(sh[i])):{date:new Date().toISOString().slice(0,10),lead:'',
    sales:products.map(p=>({product:p,amount:''})),expenses:[{label:'',amount:''}],prev_cash:'',bank_deposit:''};
  window._shift=s;
  renderShiftModal(i);
}
function renderShiftModal(i){
  const s=window._shift;
  const salesRows=s.sales.map((x,j)=>`<div class="form-grid" style="margin-bottom:6px">
    <div class="field" style="margin-bottom:6px"><label>${j===0?t('item'):''}</label><input value="${esc(x.product)}" oninput="_shift.sales[${j}].product=this.value"></div>
    <div class="field" style="margin-bottom:6px"><label>${j===0?t('amount'):''}</label><input type="number" step="any" value="${x.amount}" oninput="_shift.sales[${j}].amount=this.value;shiftTotals()"></div>
  </div>`).join('');
  const expRows=s.expenses.map((x,j)=>`<div class="form-grid" style="margin-bottom:6px">
    <div class="field" style="margin-bottom:6px"><label>${j===0?t('expense_line'):''}</label><input value="${esc(x.label)}" oninput="_shift.expenses[${j}].label=this.value"></div>
    <div class="field" style="margin-bottom:6px;position:relative"><label>${j===0?t('amount'):''}</label><input type="number" step="any" value="${x.amount}" oninput="_shift.expenses[${j}].amount=this.value;shiftTotals()"></div>
  </div>`).join('');
  const body=`<div class="form-grid">
      <div class="field"><label>${t('shift_date')}</label><input id="s_date" type="date" value="${esc(s.date)}" oninput="_shift.date=this.value"></div>
      <div class="field"><label>${t('shift_name')}</label><input value="${esc(s.lead)}" oninput="_shift.lead=this.value"></div>
    </div>
    <div class="sect-head"><h3 style="font-size:13.5px">${t('sales_by_product')}</h3></div>${salesRows}
    <div class="sect-head"><h3 style="font-size:13.5px">${t('expenses')}</h3>
      <button class="btn btn-sm" onclick="_shift.expenses.push({label:'',amount:''});renderShiftModal(${i})">${t('add_expense')}</button></div>${expRows}
    <div class="sect-head"><h3 style="font-size:13.5px">${t('reconcile')}</h3></div>
    <div class="form-grid">
      <div class="field"><label>${t('prev_cash')}</label><input type="number" step="any" value="${s.prev_cash}" oninput="_shift.prev_cash=this.value;shiftTotals()"></div>
      <div class="field"><label>${t('bank_deposit')}</label><input type="number" step="any" value="${s.bank_deposit}" oninput="_shift.bank_deposit=this.value;shiftTotals()"></div>
    </div>
    <div class="card card-pad" style="background:var(--panel2)"><table style="font-size:13px">
      <tr><td style="border:none;padding:3px 0">${t('shift_total')}</td><td class="t-num num" id="st_sales" style="border:none;padding:3px 0"></td></tr>
      <tr><td style="border:none;padding:3px 0">${t('expenses')}</td><td class="t-num num" id="st_exp" style="border:none;padding:3px 0"></td></tr>
      <tr><td style="border:none;padding:3px 0">${t('net_after_exp')}</td><td class="t-num num" id="st_net" style="border:none;padding:3px 0;font-weight:800"></td></tr>
      <tr><td style="border:none;padding:3px 0">${t('cash_in_hand')}</td><td class="t-num num pos" id="st_cash" style="border:none;padding:3px 0;font-weight:800"></td></tr>
    </table></div>`;
  modal(i>=0?t('edit'):t('new_shift'),body,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="saveShift(${i})">${t('save')}</button>`);
  shiftTotals();
}
function shiftTotals(){
  const s=window._shift;if(!s)return;
  const salesT=sum(s.sales,x=>x.amount),expT=sum(s.expenses,x=>x.amount),net=salesT-expT;
  const cash=net+n(s.prev_cash)-n(s.bank_deposit);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=money(v);};
  set('st_sales',salesT);set('st_exp',expT);set('st_net',net);set('st_cash',cash);
}
function saveShift(i){
  const s=window._shift;
  s.sales=s.sales.filter(x=>x.product&&x.amount!=='');
  s.expenses=s.expenses.filter(x=>x.label&&x.amount!=='');
  if(i>=0)DB.shifts[i]=s;else DB.shifts.push(s);
  saveDB();closeModal();toast(t('saved'));render();
}
function delShift(i){if(!confirm(t('confirm_del')))return;DB.shifts.splice(i,1);saveDB();toast(t('deleted'));render();}

/* ============================================================
   VIEW MODULES (part 2) + export + init
   ============================================================ */

/* ---------------- MONTHLY CLOSING ---------------- */
let monthSel=null;
VIEWS.monthly=function(){
  const ms=DB.monthly||[];
  if(!ms.length)return printHead(t('monthly'))+`<div class="card"><div class="empty">${t('no_data')}</div></div>`;
  if(monthSel===null||!ms.find(m=>m.sheet===monthSel))monthSel=(ms.find(m=>m.sheet==='7-2025')||ms[0]).sheet;
  const m=ms.find(x=>x.sheet===monthSel);
  let h=printHead((m.title||monthSel));
  h+=`<div class="toolbar no-print"><div class="field" style="margin:0"><label>${t('month')}</label>
    <select onchange="monthSel=this.value;render()">${ms.map(x=>`<option value="${esc(x.sheet)}" ${x.sheet===monthSel?'selected':''}>${esc(x.title||x.sheet)}</option>`).join('')}</select></div>
    <span class="spacer"></span><button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  const cs=m.cap_summary||{};
  h+=`<div class="grid kpis">
    ${kpi(t('income_total'),money(m.income_total),'trending','ic-g')}
    ${kpi(t('exp_total'),money(m.exp_total),'card','ic-r')}
    ${kpi(t('total_capital'),money(cs['اجمالي رأس المال']),'award','ic-y')}
    ${kpi(t('net_capital'),money(cs['صافي رأس المال']),'award','ic-v')}
  </div>`;
  h+=`<div class="two-col" style="margin-top:16px">
    <div class="card"><div class="card-head"><h3>${t('fuel_income')}</h3></div><div class="tbl-wrap"><table>
      <thead><tr><th>${t('label')}</th><th class="t-num">${t('liters_k')}</th><th class="t-num">${t('price')}</th><th class="t-num">${t('amount')}</th></tr></thead>
      <tbody>${m.fuel.map(f=>`<tr><td>${esc(f.label)}</td><td class="t-num num">${f.liters!=null?fmt(f.liters):'—'}</td>
        <td class="t-num num">${f.price!=null?fmt(f.price,2):'—'}</td><td class="t-num num">${fmt(f.amount)}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td colspan="3">${t('income_total')}</td><td class="t-num num">${fmt(m.income_total)}</td></tr></tfoot></table></div></div>
    <div class="card"><div class="card-head"><h3>${t('expenses')}</h3></div><div class="tbl-wrap"><table>
      <thead><tr><th>${t('label')}</th><th class="t-num">${t('amount')}</th></tr></thead>
      <tbody>${m.expenses.map(e=>`<tr><td>${esc(e.label)}</td><td class="t-num num">${fmt(e.amount)}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td>${t('exp_total')}</td><td class="t-num num">${fmt(m.exp_total)}</td></tr></tfoot></table></div></div>
  </div>`;
  h+=`<div class="two-col" style="margin-top:16px">
    <div class="card"><div class="card-head"><h3>${t('oil_income')}</h3></div><div class="tbl-wrap"><table>
      <thead><tr><th>${t('label')}</th><th class="t-num">${t('amount')}</th></tr></thead>
      <tbody>${m.oil.map(o=>`<tr><td>${esc(o.label)}</td><td class="t-num num">${fmt(o.amount)}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="card"><div class="card-head"><h3>${t('capital')}</h3></div><div class="tbl-wrap"><table>
      <thead><tr><th>${t('label')}</th><th class="t-num">${t('qty')}</th><th class="t-num">${t('price')}</th><th class="t-num">${t('amount')}</th></tr></thead>
      <tbody>${m.capital.map(c=>`<tr><td>${esc(c.label)}</td><td class="t-num num">${c.qty!=null?fmt(c.qty):'—'}</td>
        <td class="t-num num">${c.price!=null?fmt(c.price,2):'—'}</td><td class="t-num num">${fmt(c.amount)}</td></tr>`).join('')}</tbody></table></div></div>
  </div>`;
  return h;
};

/* ---------------- TANKS ---------------- */
let tankSel=0;
VIEWS.tanks=function(){
  const ts=DB.tanks||[];
  if(!ts.length)return printHead(t('tanks'))+`<div class="card"><div class="empty">${t('no_data')}</div></div>`;
  if(tankSel>=ts.length)tankSel=0;
  const tk=ts[tankSel];
  let h=printHead(tk.period||tk.sheet);
  h+=`<div class="toolbar no-print"><div class="field" style="margin:0;min-width:260px"><label>${t('select_period')}</label>
    <select onchange="tankSel=+this.value;render()">${ts.map((x,i)=>`<option value="${i}" ${i===tankSel?'selected':''}>${esc(x.period||x.sheet)}</option>`).join('')}</select></div>
    <span class="spacer"></span><button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  // sold summary KPIs
  const sold=tk.sold||[];
  h+=`<div class="grid kpis">
    ${sold.map(s=>kpi(s.item,fmt(s.net)+' '+t('liter'),'droplet','ic-b','',t('sold_net'))).join('')}
  </div>`;
  h+=`<div class="card" style="margin-top:16px"><div class="card-head"><h3>${t('recon_detail')}</h3></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('label')}</th>
    <th class="t-num">${t('solar')}</th><th class="t-num">${t('p92')}</th><th class="t-num">${t('p95')}</th></tr></thead><tbody>
    ${(tk.recon||[]).map(r=>{const isVar=/عجز|الزيادة/.test(r.label);
      return `<tr><td>${esc(r.label)}</td>
      <td class="t-num num ${isVar?(n(r.solar)<0?'neg':'pos'):''}">${fmt(r.solar)}</td>
      <td class="t-num num ${isVar?(n(r.p92)<0?'neg':'pos'):''}">${fmt(r.p92)}</td>
      <td class="t-num num ${isVar?(n(r.p95)<0?'neg':'pos'):''}">${fmt(r.p95)}</td></tr>`;}).join('')}
    </tbody></table></div></div>`;
  if(sold.length){
    h+=`<div class="card" style="margin-top:16px"><div class="card-head"><h3>${t('sold_gross')}</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>${t('item')}</th><th class="t-num">${t('sold_net')}</th>
      <th class="t-num">${t('calib')}</th><th class="t-num">${t('sold_gross')}</th></tr></thead><tbody>
      ${sold.map(s=>`<tr><td>${esc(s.item)}</td><td class="t-num num">${fmt(s.net)}</td>
        <td class="t-num num">${fmt(s.calib)}</td><td class="t-num num">${fmt(s.gross)}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
  return h;
};

/* ---------------- COMMISSION ---------------- */
let commYM=null;
VIEWS.commission=function(){
  const months=shiftMonths();  // months that have shifts
  const eg=egpcSettings();
  let h=printHead(t('commission'));
  h+=`<div class="note no-print" style="margin-bottom:16px">${icon('award')}<div>${t('comm_auto_note')}</div></div>`;
  h+=`<div class="toolbar no-print"><span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span><span class="spacer"></span>`;
  if(!months.length)return h+`</div><div class="card"><div class="empty">${icon('award')}<div>${t('no_shifts_month')}</div></div></div>`;
  if(commYM===null||!months.includes(commYM))commYM=months[0];
  h+=`<div class="field" style="margin:0;min-width:180px"><label style="display:none">m</label>
    <select onchange="commYM=this.value;render()">${months.map(m=>`<option value="${m}" ${m===commYM?'selected':''}>${monthLabelAr(m)}</option>`).join('')}</select></div>
    <button class="btn btn-primary" onclick="window.print()">${icon('file')} ${t('print')}</button></div>`;
  const agg=aggregateMonth(commYM);
  const supplied={p92:agg.incoming.p92,p95:agg.incoming.p95,solar:agg.incoming.solar};
  const prods=[['p92','92',eg.p92],['p95','95',eg.p95],['solar',t('solar'),eg.solar]];
  const pct=n(eg.percent), tax=n(eg.tax);
  let T={sales:0,egpc:0,total:0,tax:0,net:0};
  const rows=prods.map(([k,lbl,rate])=>{
    const sales=n(supplied[k]); const egpc=sales*n(rate); const total=egpc*pct; const tx=total*tax; const net=total-tx;
    T.sales+=sales;T.egpc+=egpc;T.total+=total;T.tax+=tx;T.net+=net;
    return {lbl,sales,rate:n(rate),egpc,total,tx,net};
  });
  h+=`<div class="card" style="margin-top:4px"><div class="card-head"><h3>${t('commission')} — ${monthLabelAr(commYM)}</h3>
    <span class="spacer"></span><span class="badge" style="background:var(--greenbg);color:var(--green);border-color:transparent">${t('net')}: ${money(T.net)}</span></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('item')}</th>
      <th class="t-num">${t('sales')} (${t('liter')})</th><th class="t-num">${t('comm_rate')}</th><th class="t-num">${t('percent')}</th>
      <th class="t-num">${t('egpc_comm')}</th><th class="t-num">${t('total_comm')}</th><th class="t-num">${t('tax2')}</th><th class="t-num">${t('net')}</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td class="h">${esc(r.lbl)}</td>
      <td class="t-num num">${fmt(r.sales,0)}</td><td class="t-num num">${fmt(r.rate,4)}</td><td class="t-num num">${fmt(pct*100,0)}%</td>
      <td class="t-num num">${fmt(r.egpc)}</td><td class="t-num num">${fmt(r.total)}</td><td class="t-num num">${fmt(r.tx)}</td>
      <td class="t-num num pos">${fmt(r.net)}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td>${t('total')}</td><td class="t-num num">${fmt(T.sales,0)}</td><td></td><td></td>
      <td class="t-num num">${fmt(T.egpc)}</td><td class="t-num num">${fmt(T.total)}</td><td class="t-num num">${fmt(T.tax)}</td>
      <td class="t-num num pos" style="font-size:15px">${fmt(T.net)}</td></tr></tfoot></table></div></div>`;
  h+=`<div class="hint no-print" style="margin-top:10px">${t('comm_formula')}</div>`;
  return h;
};

/* ---------------- CHANNELS ---------------- */
let chanSel='petroapp';
VIEWS.channels=function(){
  const ch=DB.channels||{},tot=DB.channel_totals||{},opn=DB.channel_openings||{};
  let h=printHead(t('channels'));
  h+=`<div class="grid kpis">
    ${['petroapp','octane','petropay'].map(k=>{const tt=tot[k]||{};
      const net=n(tt.deposit)-n(tt.withdraw)-n(tt.fee);
      return kpi(t(k),money(tt.withdraw),'card',k==='petroapp'?'ic-b':k==='octane'?'ic-y':'ic-v',t('withdraw'),t('fee')+': '+fmt(tt.fee));
    }).join('')}
  </div>`;
  h+=`<div class="seg no-print" style="margin:18px 0 14px">
    ${['petroapp','octane','petropay'].map(k=>`<button class="${chanSel===k?'on':''}" onclick="chanSel='${k}';render()">${t(k)}</button>`).join('')}</div>`;
  const rows=ch[chanSel]||[];const tt=tot[chanSel]||{};
  h+=`<div class="toolbar no-print"><span class="pill">${t('opening_f')}: ${money(opn[chanSel])}</span>
    <span class="spacer"></span><button class="btn" onclick="exportCSV('channel')">${t('export_csv')}</button>
    <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th>
    <th class="t-num">${t('deposit')}</th><th class="t-num">${t('withdraw')}</th><th class="t-num">${t('fee')}</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td class="num">${fmtDate(r.date)}</td><td class="t-num num">${r.deposit?fmt(r.deposit):'—'}</td>
      <td class="t-num num">${r.withdraw?fmt(r.withdraw):'—'}</td><td class="t-num num">${r.fee?fmt(r.fee,2):'—'}</td></tr>`).join('')
      ||`<tr><td colspan="4" class="empty">${t('no_data')}</td></tr>`}</tbody>
    <tfoot><tr><td>${t('total')}</td><td class="t-num num">${fmt(tt.deposit)}</td>
    <td class="t-num num">${fmt(tt.withdraw)}</td><td class="t-num num">${fmt(tt.fee,2)}</td></tr></tfoot></table></div></div>`;
  return h;
};

/* ---------------- SUPPLIER ---------------- */
VIEWS.supplier=function(){
  const sp=DB.supplier||{rows:[]};const rows=sp.rows||[];
  const totSupply=sum(rows,r=>r.credit),totPaid=sum(rows,r=>r.debit);
  const bal=rows.length?rows[rows.length-1].balance:0;
  let h=printHead(sp.name||t('supplier'));
  h+=`<div class="grid kpis">
    ${kpi(t('total_supply'),money(totSupply),'truck','ic-b')}
    ${kpi(t('total_paid'),money(totPaid),'card','ic-g')}
    ${kpi(t('current_balance'),money(bal),'file','ic-r')}
  </div>`;
  h+=`<div class="toolbar no-print" style="margin-top:16px"><span class="pill">${esc(sp.name)}</span>
    <span class="spacer"></span><button class="btn" onclick="exportCSV('supplier')">${t('export_csv')}</button>
    <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th><th>${t('invoice')}</th>
    <th>${t('statement')}</th><th class="t-num">${t('debit')}</th><th class="t-num">${t('credit')}</th><th class="t-num">${t('balance')}</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td class="num">${fmtDate(r.date)}</td><td class="num">${esc(r.inv)||'—'}</td>
      <td>${esc(r.desc)}</td><td class="t-num num">${r.debit?fmt(r.debit):'—'}</td>
      <td class="t-num num">${r.credit?fmt(r.credit):'—'}</td><td class="t-num num">${fmt(r.balance)}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td colspan="3">${t('total')}</td><td class="t-num num">${fmt(totPaid)}</td>
    <td class="t-num num">${fmt(totSupply)}</td><td class="t-num num">${fmt(bal)}</td></tr></tfoot></table></div></div>`;
  return h;
};

/* ---------------- REPORTS ---------------- */
let repType='monthly_r', repFrom='', repTo='', repResult=null;
VIEWS.reports=function(){
  let h=printHead(t('reports'));
  h+=`<div class="card card-pad no-print" style="margin-bottom:16px">
    <div class="seg" style="margin-bottom:14px">
      ${[['weekly','weekly'],['monthly_r','monthly_r'],['yearly','yearly'],['custom','custom']].map(([k])=>
        `<button class="${repType===k?'on':''}" onclick="repType='${k}';render()">${t(k)}</button>`).join('')}</div>
    <div class="form-grid">
      <div class="field"><label>${t('from')}</label><input type="date" id="rep_from" value="${repFrom}"></div>
      <div class="field"><label>${t('to')}</label><input type="date" id="rep_to" value="${repTo}"></div>
      <div class="field" style="display:flex;align-items:flex-end"><button class="btn btn-primary" style="width:100%" onclick="runReport()">${t('generate')}</button></div>
    </div>
    <div class="hint">${LANG==='ar'?'يجمع التقرير حركة المخزون وقنوات التحصيل وكشف المورد ضمن الفترة المختارة. حدود التواريخ شاملة لليومين الأول والأخير.':'Aggregates stock movements, collection channels and supplier statement within the selected range. Date boundaries are inclusive of first and last day.'}</div>
  </div>`;
  if(repResult)h+=repResult;
  else h+=`<div class="card"><div class="empty">${icon('file')}<div>${LANG==='ar'?'اختر الفترة واضغط عرض التقرير':'Choose a period and press Generate'}</div></div></div>`;
  return h;
};
AFTER.reports=function(){
  if(repType!=='custom'){
    const now=new Date();let from,to;
    if(repType==='weekly'){to=new Date(now);from=new Date(now);from.setDate(from.getDate()-6);}
    else if(repType==='monthly_r'){from=new Date(now.getFullYear(),now.getMonth(),1);to=new Date(now.getFullYear(),now.getMonth()+1,0);}
    else{from=new Date(now.getFullYear(),0,1);to=new Date(now.getFullYear(),11,31);}
    const f=document.getElementById('rep_from'),tt=document.getElementById('rep_to');
    if(f&&!repFrom)f.value=from.toISOString().slice(0,10);
    if(tt&&!repTo)tt.value=to.toISOString().slice(0,10);
  }
};
function runReport(){
  repFrom=document.getElementById('rep_from').value;repTo=document.getElementById('rep_to').value;
  if(!repFrom||!repTo){toast(t('report_period')+' ?','err');return;}
  const inRange=d=>d&&d>=repFrom&&d<=repTo;
  const mv=(DB.movements||[]).filter(m=>inRange(m.date));
  const sh=(DB.shifts||[]).filter(s=>inRange(s.date));
  const sup=(DB.supplier.rows||[]).filter(r=>inRange(r.date));
  const chAll=[];['petroapp','octane','petropay'].forEach(k=>(DB.channels[k]||[]).forEach(r=>{if(inRange(r.date))chAll.push(Object.assign({chan:k},r));}));
  const shSales=sum(sh,s=>sum(s.sales||[],x=>x.amount));
  const shExp=sum(sh,s=>sum(s.expenses||[],x=>x.amount));
  let h=printHead(`${t('report_period')}: ${fmtDate(repFrom)} — ${fmtDate(repTo)}`);
  h+=`<div class="grid kpis">
    ${kpi(t('total_in'),fmt(sum(mv,m=>m['in'])),'upload','ic-b',t('liter'))}
    ${kpi(t('total_out'),fmt(sum(mv,m=>m.out)),'droplet','ic-r',t('liter'))}
    ${kpi(t('shift_total'),money(shSales),'clock','ic-g')}
    ${kpi(t('expenses'),money(shExp),'card','ic-r')}
    ${kpi(t('total_supply'),money(sum(sup,r=>r.credit)),'truck','ic-y')}
    ${kpi(t('withdraw'),money(sum(chAll,r=>r.withdraw)),'card','ic-v',t('collections'))}
  </div>`;
  h+=`<div class="card" style="margin-top:16px"><div class="card-head"><h3>${t('movements')} (${mv.length} ${t('rows_found')})</h3></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th><th>${t('item')}</th><th>${t('type')}</th>
    <th class="t-num">${t('mv_in')}</th><th class="t-num">${t('mv_out')}</th></tr></thead><tbody>
    ${mv.map(m=>`<tr><td class="num">${fmtDate(m.date)}</td><td>${esc(m.item)}</td>
      <td>${m.type==='اضافة'?t('mv_type_add'):t('mv_type_out')}</td>
      <td class="t-num num">${m['in']?fmt(m['in']):'—'}</td><td class="t-num num">${m.out?fmt(m.out):'—'}</td></tr>`).join('')
      ||`<tr><td colspan="5" class="empty">${t('no_data')}</td></tr>`}</tbody></table></div></div>`;
  repResult=h;render();
  document.getElementById('view').scrollTo({top:600,behavior:'smooth'});
}

/* ---------------- IMPORT / EXPORT ---------------- */
VIEWS.importexport=function(){
  let h=printHead(t('importexport'));
  h+=`<div class="two-col">
    <div class="card card-pad">
      <div class="sect-head" style="margin-top:0"><h3>${t('import_excel')}</h3></div>
      <div class="note" style="margin-bottom:14px">${icon('file')}<div>${t('import_note')}</div></div>
      <div id="drop" style="border:2px dashed var(--line2);border-radius:12px;padding:30px;text-align:center;color:var(--txt2);cursor:pointer"
        onclick="document.getElementById('fileIn').click()">
        ${icon('upload')}<div style="margin-top:8px;font-weight:600">${t('import_excel')}</div></div>
      <input type="file" id="fileIn" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFile(this.files[0])">
      <div id="importPreview"></div>
    </div>
    <div class="card card-pad">
      <div class="sect-head" style="margin-top:0"><h3>${t('export_all')}</h3></div>
      <p style="color:var(--txt2);font-size:13px;margin-bottom:14px">${LANG==='ar'?'نزّل نسخة كاملة من بياناتك الحالية (بما فيها تعديلاتك) كملف JSON للنسخ الاحتياطي.':'Download a full copy of your current data (including your edits) as a JSON backup file.'}</p>
      <button class="btn btn-primary" onclick="exportJSON()">${icon('upload')} ${t('export_all')}</button>
      <div class="sect-head"><h3>${LANG==='ar'?'تصدير الجداول':'Export tables'}</h3></div>
      <div class="seg">
        <button class="btn btn-sm" onclick="exportCSV('movements')">${t('movements')}</button>
        <button class="btn btn-sm" onclick="exportCSV('commission')">${t('commission')}</button>
        <button class="btn btn-sm" onclick="exportCSV('supplier')">${t('supplier')}</button>
      </div>
    </div></div>`;
  h+=`<div class="note no-print" style="margin-top:16px">${icon('file')}<div>${t('disclaimer')}</div></div>`;
  return h;
};
let XLSX_LOADED=false;
function handleFile(file){
  if(!file)return;
  const pv=document.getElementById('importPreview');
  pv.innerHTML=`<div style="padding:14px;color:var(--txt2)">…</div>`;
  const ext=file.name.split('.').pop().toLowerCase();
  if(ext==='csv'){const r=new FileReader();r.onload=e=>previewRows(parseCSV(e.target.result),file.name);r.readAsText(file);return;}
  loadXLSX(()=>{
    const r=new FileReader();
    r.onload=e=>{try{
      const wb=XLSX.read(new Uint8Array(e.target.result),{type:'array'});
      const ws=wb.Sheets[wb.SheetNames[0]];
      const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:null});
      previewRows(rows,file.name+' › '+wb.SheetNames[0]);
    }catch(err){pv.innerHTML=`<div class="note" style="margin-top:14px;border-inline-start-color:var(--red)">${icon('file')}<div>${esc(err.message)}</div></div>`;}};
    r.readAsArrayBuffer(file);
  });
}
function loadXLSX(cb){
  if(XLSX_LOADED&&window.XLSX)return cb();
  const s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  s.onload=()=>{XLSX_LOADED=true;cb();};
  s.onerror=()=>toast('xlsx load failed','err');
  document.head.appendChild(s);
}
function parseCSV(txt){return txt.split(/\r?\n/).filter(l=>l.length).map(l=>l.split(','));}
function previewRows(rows,name){
  const pv=document.getElementById('importPreview');
  const body=rows.slice(0,12);
  pv.innerHTML=`<div class="note" style="margin:14px 0">${icon('file')}<div><b>${esc(name)}</b> — ${rows.length} ${t('rows_found')}</div></div>
    <div class="tbl-wrap" style="border:1px solid var(--line);border-radius:10px;max-height:300px;overflow:auto">
    <table><tbody>${body.map(r=>`<tr>${r.slice(0,10).map(c=>`<td style="font-size:12px">${esc(c==null?'':c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="hint">${LANG==='ar'?'هذه معاينة فقط — دمج الاستيراد التلقائي مع نموذج البيانات مخطط له في نسخة React (يتطلب مطابقة الأعمدة وكشف التكرارات).':'Preview only — automatic mapping into the data model is planned for the React version (requires column matching and duplicate detection).'}</div>`;
}
function exportJSON(){
  const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});
  dl(blob,'al-farouk-data.json');toast(t('saved'));
}
function csvEscape(v){v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function exportCSV(which){
  let head=[],rows=[];
  if(which==='movements'){head=['date','permit','type','item','code','in','out','balance'];
    rows=(DB.movements||[]).map(m=>[m.date,m.permit,m.type,m.item,m.code,m['in'],m.out,m.balance]);}
  else if(which==='items'){head=['code','name','group','supplier','price'];rows=(DB.items||[]).map(x=>[x.code,x.name,x.group,x.supplier,x.price]);}
  else if(which==='opening'){head=['code','name','open_qty','cost','open_value','cur_qty','cur_value','supplier'];
    rows=(DB.opening||[]).map(x=>[x.code,x.name,x.open_qty,x.cost,x.open_value,x.cur_qty,x.cur_value,x.supplier]);}
  else if(which==='supplier'){head=['date','invoice','desc','debit','credit','balance'];
    rows=(DB.supplier.rows||[]).map(r=>[r.date,r.inv,r.desc,r.debit,r.credit,r.balance]);}
  else if(which==='commission'){head=['month','product','sales','commission','percent','egpc','total_comm','tax2','net'];
    (DB.commission_months||[]).forEach(b=>b.lines.forEach(l=>rows.push([b.month,l.product,l.sales,l.commission,l.percent,l.egpc,l.total_comm,l.tax2,l.net])));}
  else if(which==='channel'){head=['date','deposit','withdraw','fee'];rows=(DB.channels[chanSel]||[]).map(r=>[r.date,r.deposit,r.withdraw,r.fee]);}
  else if(which==='shifts'){head=['date','lead','sales_total','expenses_total'];
    rows=(DB.shifts||[]).map(s=>[s.date,s.lead,sum(s.sales||[],x=>x.amount),sum(s.expenses||[],x=>x.amount)]);}
  else if(which==='ledger'){head=['date','income','expense','label','note'];
    rows=ledgerRows(ieYM).map(r=>[r.date,r.income||'',r.expense||'',r.label,r.note]);}
  const csv='﻿'+[head.join(',')].concat(rows.map(r=>r.map(csvEscape).join(','))).join('\n');
  dl(new Blob([csv],{type:'text/csv;charset=utf-8'}),which+'.csv');toast(t('saved'));
}
function dl(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}

/* ---------------- SETTINGS ---------------- */
VIEWS.settings=function(){
  let h=printHead(t('settings'));
  h+=`<div class="two-col">
    <div class="card card-pad">
      <div class="sect-head" style="margin-top:0"><h3>${t('language')} & ${t('theme')}</h3></div>
      <div class="field"><label>${t('language')}</label>
        <select onchange="setLang(this.value)"><option value="ar" ${LANG==='ar'?'selected':''}>العربية</option>
        <option value="en" ${LANG==='en'?'selected':''}>English</option></select></div>
      <div class="field"><label>${t('theme')}</label>
        <select onchange="if(this.value!=='${THEME}')toggleTheme()"><option value="dark" ${THEME==='dark'?'selected':''}>${t('dark')}</option>
        <option value="light" ${THEME==='light'?'selected':''}>${t('light')}</option></select></div>
      <div class="sect-head"><h3>${t('reset_data')}</h3></div>
      <p style="color:var(--txt2);font-size:13px;margin-bottom:12px">${t('reset_note')}</p>
      <button class="btn btn-danger" onclick="if(confirm('${t('reset_data')}?')){resetDB();toast(t('reset_done'));render();}">${t('reset_data')}</button>
    </div>
    <div class="card card-pad">
      <div class="sect-head" style="margin-top:0"><h3>${t('data_model')}</h3></div>
      <table style="font-size:13px"><tbody>
        <tr><td style="border-color:var(--line)">${t('items_cat')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.items||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('movements')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.movements||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('opening_bal')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.opening||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('monthly')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.monthly||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('tanks')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.tanks||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('commission')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.commission_months||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('supplier')}</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.supplier.rows||[]).length)}</td></tr>
        <tr><td style="border-color:var(--line)">${t('shifts')} (${LANG==='ar'?'محلي':'local'})</td><td class="t-num num" style="border-color:var(--line)">${fmt((DB.shifts||[]).length)}</td></tr>
      </tbody></table>
      <div class="sect-head"><h3>${t('locked_file')}</h3></div>
      <div class="note" style="border-inline-start-color:var(--amber)">${icon('file')}<div>${t('locked_note')}</div></div>
    </div></div>`;
  if(isSuper()){
    h+=`<div class="card card-pad" style="margin-top:16px;border-color:var(--brand)">
      <div class="sect-head" style="margin-top:0"><h3>${t('branches_title')}</h3></div>
      <div class="form-grid">
        ${APP.branches.map(b=>`<div class="field"><label>${esc(b.id)}</label><input value="${esc(b.name)}" oninput="renameBranchUI('${b.id}',this.value)"></div>`).join('')}
      </div></div>`;
    h+=`<div class="card card-pad" style="margin-top:16px;border-color:var(--brand)">
      <div class="sect-head" style="margin-top:0"><h3>${t('cloud_setup')}</h3></div>
      <div class="note" style="margin-bottom:14px;border-inline-start-color:${(typeof CLOUD!=='undefined'&&CLOUD.on)?'var(--green)':'var(--amber)'}">${icon('truck')}<div>
        ${(typeof CLOUD!=='undefined'&&CLOUD.on)?('<b>'+t('cloud_mode')+'</b> — '+esc((CLOUD.cfg&&CLOUD.cfg.url)||'')):('<b>'+t('local_mode')+'</b> — '+t('cloud_intro'))}</div></div>
      <button class="btn btn-primary" onclick="cloudSetupModal()">${icon('truck')} ${t('cloud_setup')}</button></div>`;
  }
  if(isSuper()){
    const st=branchSettings();
    h+=`<div class="card card-pad" style="margin-top:16px;border-color:var(--brand)">
      <div class="sect-head" style="margin-top:0"><h3>${t('price_comm_title')}</h3></div>
      <div class="note" style="margin-bottom:14px;border-inline-start-color:var(--brand2)">${icon('award')}<div>${t('price_comm_note')} — <b>${esc(branchName(APP.active.branch))}</b></div></div>
      <div class="form-grid">
        <div class="field"><label>${t('price')} — ${t('p92')}</label><input type="number" step="any" value="${st.prices.p92}" oninput="setPrice('p92',this.value)"></div>
        <div class="field"><label>${t('price')} — ${t('p95')}</label><input type="number" step="any" value="${st.prices.p95}" oninput="setPrice('p95',this.value)"></div>
        <div class="field"><label>${t('price')} — ${t('solar')}</label><input type="number" step="any" value="${st.prices.solar}" oninput="setPrice('solar',this.value)"></div>
        <div class="field"><label>${t('comm_benzene')} (${t('liter')})</label><input type="number" step="any" value="${st.commission.benzeneRate}" oninput="setComm('benzeneRate',this.value)"></div>
        <div class="field"><label>${t('comm_solar')} (${t('liter')})</label><input type="number" step="any" value="${st.commission.solarRate}" oninput="setComm('solarRate',this.value)"></div>
      </div>
      <div class="hint">${t('price_comm_hint')}</div></div>`;
    const eg=egpcSettings();
    h+=`<div class="card card-pad" style="margin-top:16px;border-color:var(--brand)">
      <div class="sect-head" style="margin-top:0"><h3>${t('egpc_rates_title')}</h3></div>
      <div class="form-grid">
        <div class="field"><label>92</label><input type="number" step="any" value="${eg.p92}" oninput="setEgpc('p92',this.value)"></div>
        <div class="field"><label>95</label><input type="number" step="any" value="${eg.p95}" oninput="setEgpc('p95',this.value)"></div>
        <div class="field"><label>${t('solar')}</label><input type="number" step="any" value="${eg.solar}" oninput="setEgpc('solar',this.value)"></div>
        <div class="field"><label>${t('percent')}</label><input type="number" step="any" value="${eg.percent}" oninput="setEgpc('percent',this.value)"></div>
        <div class="field"><label>${t('tax2')}</label><input type="number" step="any" value="${eg.tax}" oninput="setEgpc('tax',this.value)"></div>
      </div>
      <div class="hint">${t('comm_auto_note')}</div></div>`;
  }
  h+=`<div class="card card-pad" style="margin-top:16px">
    <div class="sect-head" style="margin-top:0"><h3>${t('about')}</h3></div>
    <p style="color:var(--txt2);font-size:13px;line-height:1.7">${t('disclaimer')}</p></div>`;
  return h;
};
let _setTimer=null;
function setPrice(k,v){branchSettings().prices[k]=n(v);saveDB();cloudSettingsDebounced();}
function setComm(k,v){branchSettings().commission[k]=n(v);saveDB();cloudSettingsDebounced();}
function setEgpc(k,v){egpcSettings()[k]=n(v);saveDB();cloudSettingsDebounced();}
let _brTimer=null;
function renameBranchUI(id,name){const b=APP.branches.find(x=>x.id===id);if(b){b.name=name;saveAPP();renderTopbarUser();clearTimeout(_brTimer);if(CLOUD.on)_brTimer=setTimeout(()=>cloudRenameBranch(id,name),600);}}
function cloudSettingsDebounced(){if(!CLOUD.on)return;clearTimeout(_setTimer);const bid=APP.active.branch;_setTimer=setTimeout(()=>cloudSaveSettings(bid,branchSettings()),600);}

/* ============================================================
   INIT
   ============================================================ */
/* init moved to app_boot.js (runs after all modules load) */

/* ============================================================
   COLLECTION CHANNELS (auto withdrawals + manual deposits/fees)
   SUPPLIER ACCOUNT (supply = qty×price debt, payments, running balance)
   ============================================================ */
function saveAccounts(){saveDB();if(CLOUD.on)cloudSettingsDebounced();}

/* ---------------- CHANNELS ---------------- */
const CH_KEYS=[['bank','bank_visa'],['petroapp','petroapp'],['octane','octane'],['petropay','petropay']];
function channelWithdrawByDate(channel){
  const map={};
  (DB.shifts||[]).forEach(s=>{const v=n((s.collections||{})[channel]);if(v)map[s.date]=(map[s.date]||0)+v;});
  return map;
}
function channelLedger(channel){
  const wd=channelWithdrawByDate(channel);
  const manual=(DB.channelManual||[]).filter(x=>x.channel===channel);
  const manMap={};manual.forEach(m=>{manMap[m.date]=m;});
  const dates=Array.from(new Set([...Object.keys(wd),...manual.map(m=>m.date)])).sort();
  const open=n((branchSettings().channelOpening||{})[channel]);
  let run=open;const rows=[];
  dates.forEach(d=>{
    const w=n(wd[d]); const m=manMap[d]||{};
    run += w - n(m.deposit) - n(m.fee);
    rows.push({date:d,withdraw:w,deposit:n(m.deposit),fee:n(m.fee),note:m.note||'',bal:run,hasManual:!!manMap[d]});
  });
  return {open,rows,totW:sum(rows,r=>r.withdraw),totD:sum(rows,r=>r.deposit),totF:sum(rows,r=>r.fee),bal:run};
}
VIEWS.channels=function(){
  let h=printHead(t('channels'));
  h+=`<div class="note no-print" style="margin-bottom:14px">${icon('card')}<div>${t('channel_note')}</div></div>`;
  h+=`<div class="seg no-print" style="margin-bottom:14px">
    ${CH_KEYS.map(([k,lbl])=>`<button class="${chanSel===k?'on':''}" onclick="chanSel='${k}';render()">${t(lbl)}</button>`).join('')}</div>`;
  if(!CH_KEYS.find(c=>c[0]===chanSel))chanSel='bank';
  const L=channelLedger(chanSel);
  h+=`<div class="grid kpis">
    ${kpi(t('opening_bal'),money(L.open),'card','ic-b')}
    ${kpi(t('withdrawals'),money(L.totW),'trending','ic-g')}
    ${kpi(t('deposit'),money(L.totD),'truck','ic-y')}
    ${kpi(t('running_bal'),money(L.bal),'award',L.bal<0?'ic-r':'ic-v')}
  </div>`;
  h+=`<div class="toolbar no-print" style="margin-top:16px">
    <button class="btn btn-primary" onclick="editChannelEntry()">${icon('card')} ${t('add_entry')}</button>
    <span class="spacer"></span><button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th>
    <th class="t-num">${t('withdrawals_auto')}</th><th class="t-num">${t('deposit')}</th><th class="t-num">${t('service_fee')}</th>
    <th>${t('notes')}</th><th class="t-num">${t('running_bal')}</th><th class="no-print"></th></tr></thead><tbody>
    ${L.rows.map(r=>`<tr><td class="num">${fmtDate(r.date)}</td>
      <td class="t-num num pos">${r.withdraw?fmt(r.withdraw):'—'}</td>
      <td class="t-num num">${r.deposit?fmt(r.deposit):'—'}</td><td class="t-num num">${r.fee?fmt(r.fee,2):'—'}</td>
      <td style="color:var(--txt2);font-size:12px">${esc(r.note)}</td><td class="t-num num" style="font-weight:700">${fmt(r.bal)}</td>
      <td class="no-print"><button class="btn btn-sm btn-ghost" onclick="editChannelEntry('${r.date}')">${t('edit')}</button></td></tr>`).join('')
      ||`<tr><td colspan="7" class="empty">${t('no_data')}</td></tr>`}
    </tbody><tfoot><tr><td>${t('total')}</td><td class="t-num num">${fmt(L.totW)}</td>
    <td class="t-num num">${fmt(L.totD)}</td><td class="t-num num">${fmt(L.totF,2)}</td><td></td>
    <td class="t-num num">${fmt(L.bal)}</td><td class="no-print"></td></tr></tfoot></table></div></div>`;
  h+=`<div class="card card-pad no-print" style="margin-top:16px">
    <div class="sect-head" style="margin-top:0"><h3>${t('set_opening')} — ${t(CH_KEYS.find(c=>c[0]===chanSel)[1])}</h3></div>
    <div class="field" style="max-width:260px"><input type="number" step="any" value="${(branchSettings().channelOpening||{})[chanSel]||''}" oninput="setChannelOpening('${chanSel}',this.value)"></div></div>`;
  return h;
};
function setChannelOpening(ch,v){const s=branchSettings();if(!s.channelOpening)s.channelOpening={};s.channelOpening[ch]=v===''?'':n(v);saveAccounts();}
function editChannelEntry(date){
  const existing=(DB.channelManual||[]).find(x=>x.channel===chanSel&&x.date===date)||{};
  const d=date||new Date().toISOString().slice(0,10);
  modal(t('add_entry'),
    `<div class="form-grid">
      <div class="field"><label>${t('date')}</label><input id="ce_date" type="date" value="${esc(existing.date||d)}"></div>
      <div class="field"><label>${t('deposit')}</label><input id="ce_dep" type="number" step="any" value="${existing.deposit!=null?existing.deposit:''}"></div>
      <div class="field"><label>${t('service_fee')}</label><input id="ce_fee" type="number" step="any" value="${existing.fee!=null?existing.fee:''}"></div>
    </div><div class="field"><label>${t('notes')}</label><input id="ce_note" value="${esc(existing.note||'')}"></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="saveChannelEntry()">${t('save')}</button>`);
}
function saveChannelEntry(){
  const g=id=>document.getElementById(id).value;
  const date=g('ce_date');const rec={channel:chanSel,date,deposit:g('ce_dep')===''?'':n(g('ce_dep')),fee:g('ce_fee')===''?'':n(g('ce_fee')),note:g('ce_note')};
  DB.channelManual=DB.channelManual||[];
  const i=DB.channelManual.findIndex(x=>x.channel===chanSel&&x.date===date);
  if(i>=0)DB.channelManual[i]=rec;else DB.channelManual.push(rec);
  saveAccounts();closeModal();toast(t('saved'));render();
}

/* ---------------- SUPPLIER ---------------- */
function supplierLedger(){
  const open=n(branchSettings().supplierOpening);
  const entries=(DB.supplierEntries||[]).slice().sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  let run=open;const rows=[{date:null,inv:'',desc:t('carried_balance'),credit:open,debit:0,bal:open,carried:true}];
  entries.forEach(e=>{const credit=n(e.credit),debit=n(e.debit);run+=credit-debit;rows.push({id:e.id,date:e.date,inv:e.inv||'',desc:e.desc,credit,debit,bal:run});});
  return {open,rows,totC:sum(entries,e=>e.credit),totD:sum(entries,e=>e.debit),bal:run};
}
VIEWS.supplier=function(){
  const name=branchSettings().supplierName||t('supplier');
  const L=supplierLedger();
  let h=printHead(name);
  h+=`<div class="note no-print" style="margin-bottom:14px">${icon('truck')}<div>${t('supplier_note')}</div></div>`;
  h+=`<div class="grid kpis">
    ${kpi(t('total_supply'),money(L.totC),'truck','ic-b')}
    ${kpi(t('total_paid'),money(L.totD),'card','ic-g')}
    ${kpi(t('current_balance'),money(L.bal),'file',L.bal>0?'ic-r':'ic-g')}
  </div>`;
  h+=`<div class="toolbar no-print" style="margin-top:16px">
    <button class="btn btn-primary" onclick="supplySupplyForm()">${icon('truck')} ${t('add_supply')}</button>
    <button class="btn" onclick="supplyPaymentForm()">${t('add_payment')}</button>
    <span class="pill">${esc(name)}</span>
    <span class="spacer"></span><button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th><th>${t('invoice')}</th>
    <th>${t('statement')}</th><th class="t-num">${t('debit')}</th><th class="t-num">${t('credit')}</th><th class="t-num">${t('balance')}</th><th class="no-print"></th></tr></thead><tbody>
    ${L.rows.map(r=>`<tr${r.carried?' style="background:var(--panel2)"':''}><td class="num">${r.date?fmtDate(r.date):'—'}</td><td class="num">${esc(r.inv)||'—'}</td>
      <td>${esc(r.desc)}</td><td class="t-num num">${r.debit?fmt(r.debit):'—'}</td>
      <td class="t-num num">${r.credit?fmt(r.credit):'—'}</td><td class="t-num num" style="font-weight:700">${fmt(r.bal)}</td>
      <td class="no-print">${r.carried?'':`<button class="btn btn-sm btn-ghost btn-danger" onclick="delSupplier('${r.id}')">${t('del')}</button>`}</td></tr>`).join('')}
    </tbody><tfoot><tr><td colspan="3">${t('total')}</td><td class="t-num num">${fmt(L.totD)}</td>
    <td class="t-num num">${fmt(L.totC)}</td><td class="t-num num">${fmt(L.bal)}</td><td class="no-print"></td></tr></tfoot></table></div></div>`;
  h+=`<div class="card card-pad no-print" style="margin-top:16px"><div class="form-grid">
    <div class="field"><label>${t('supplier_name')}</label><input value="${esc(name)}" oninput="setSupplierField('supplierName',this.value)"></div>
    <div class="field"><label>${t('carried_balance')}</label><input type="number" step="any" value="${branchSettings().supplierOpening||''}" oninput="setSupplierField('supplierOpening',this.value)"></div>
  </div></div>`;
  return h;
};
function setSupplierField(k,v){branchSettings()[k]=(k==='supplierOpening'?(v===''?'':n(v)):v);saveAccounts();}
let _supLines=null;
function supplySupplyForm(){
  _supLines=[{product:'solar',qty:'',price:n((branchSettings().prices||{}).solar)}];
  renderSupplyModal();
}
function renderSupplyModal(){
  const prices=branchSettings().prices||{};
  const prodOpts=[['92','92'],['95','95'],['solar',t('solar')]];
  const linesHTML=_supLines.map((l,i)=>`<div class="form-grid" style="margin-bottom:6px">
    <div class="field" style="margin-bottom:6px"><label>${i===0?t('supply_line'):''}</label>
      <select onchange="_supLines[${i}].product=this.value;_supLines[${i}].price=(branchSettings().prices||{})[this.value==='solar'?'solar':this.value==='92'?'p92':'p95']||'';renderSupplyModal()">
        ${prodOpts.map(([v,lb])=>`<option value="${v}" ${l.product===v?'selected':''}>${lb}</option>`).join('')}</select></div>
    <div class="field" style="margin-bottom:6px"><label>${i===0?t('qty_liter'):''}</label><input type="number" step="any" value="${l.qty}" oninput="_supLines[${i}].qty=this.value;supplyTotal()"></div>
    <div class="field" style="margin-bottom:6px"><label>${i===0?t('price'):''}</label><input type="number" step="any" value="${l.price}" oninput="_supLines[${i}].price=this.value;supplyTotal()"></div>
  </div>`).join('');
  modal(t('add_supply'),
    `<div class="form-grid">
      <div class="field"><label>${t('date')}</label><input id="su_date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="field"><label>${t('invoice')}</label><input id="su_inv"></div>
    </div>
    <div class="sect-head" style="font-size:13px"><h3 style="font-size:13px">${t('supply_line')}</h3>
      <button class="btn btn-sm" onclick="_supLines.push({product:'92',qty:'',price:(branchSettings().prices||{}).p92||''});renderSupplyModal()">${t('add_line')}</button></div>
    ${linesHTML}
    <div class="card card-pad" style="background:var(--panel2)"><table style="width:100%;font-size:14px">
      <tr><td style="border:none;padding:4px 0;font-weight:800">${t('credit')} (دين)</td><td class="t-num num" id="su_total" style="border:none;padding:4px 0;font-weight:800"></td></tr></table></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="saveSupply()">${t('save')}</button>`);
  supplyTotal();
}
function supplyTotal(){const tot=_supLines.reduce((a,l)=>a+n(l.qty)*n(l.price),0);const e=document.getElementById('su_total');if(e)e.textContent=money(tot);}
function saveSupply(){
  const date=document.getElementById('su_date').value,inv=document.getElementById('su_inv').value;
  const lines=_supLines.filter(l=>n(l.qty)&&n(l.price));
  if(!lines.length){toast(t('qty_liter')+' ?','err');return;}
  const credit=lines.reduce((a,l)=>a+n(l.qty)*n(l.price),0);
  const desc='توريد '+lines.map(l=>`${fmt(l.qty,0)} لتر ${l.product==='solar'?'سولار':l.product}`).join(' و ');
  DB.supplierEntries=DB.supplierEntries||[];
  DB.supplierEntries.push({id:genId(),date,inv,type:'supply',desc,lines,credit,debit:0});
  saveAccounts();closeModal();toast(t('saved'));render();
}
function supplyPaymentForm(){
  modal(t('add_payment'),
    `<div class="form-grid">
      <div class="field"><label>${t('date')}</label><input id="pay_date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="field"><label>${t('amount')}</label><input id="pay_amount" type="number" step="any"></div>
    </div><div class="field"><label>${t('statement')}</label><input id="pay_desc" value="إيداع / تحويل"></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="savePayment()">${t('save')}</button>`);
}
function savePayment(){
  const g=id=>document.getElementById(id).value;
  const debit=n(g('pay_amount'));if(!debit){toast(t('amount')+' ?','err');return;}
  DB.supplierEntries=DB.supplierEntries||[];
  DB.supplierEntries.push({id:genId(),date:g('pay_date'),inv:'',type:'payment',desc:g('pay_desc'),lines:[],credit:0,debit});
  saveAccounts();closeModal();toast(t('saved'));render();
}
function delSupplier(id){if(!confirm(t('confirm_del')))return;DB.supplierEntries=(DB.supplierEntries||[]).filter(x=>x.id!==id);saveAccounts();toast(t('deleted'));render();}

/* ============================================================
   DAILY SHIFT CLOSING — detailed entry form + auto-calc + print
   Mirrors the paper "تقفيل وردية" sheet.
   ============================================================ */
const FUELS=[['p92','p92'],['p95','p95'],['solar','solar']];
function newPumps(){return [0,1,2,3].map(()=>({start:'',end:''}));}
function lastShift(){
  const sh=DB.shifts||[];if(!sh.length)return null;
  let best=null;sh.forEach(s=>{if(!best||((s.date||'')>=(best.date||'')))best=s;});
  return best;
}
// yesterday-morning (start) carries over automatically from the previous shift's today-morning (end)
function carriedPumps(fkey){
  const prev=lastShift();
  return [0,1,2,3].map(i=>{
    const e=(prev&&prev.pumps&&prev.pumps[fkey]&&prev.pumps[fkey][i])?prev.pumps[fkey][i].end:'';
    return {start:(e===null||e===undefined?'':e),end:''};
  });
}
function carriedHandover(){
  const prev=lastShift();
  const pe=(prev&&prev.handover&&prev.handover.end)?prev.handover.end:{};
  const cv=v=>(v===undefined||v===null)?'':v;
  return {startLead:'',endLead:'',
    start:{p95:cv(pe.p95),p92:cv(pe.p92),solar:cv(pe.solar)},
    end:{p95:'',p92:'',solar:''}};
}
function newShift(){
  const st=branchSettings();
  return {date:new Date().toISOString().slice(0,10),lead:'',
    prices:JSON.parse(JSON.stringify(st.prices)),
    pumps:{p92:carriedPumps('p92'),p95:carriedPumps('p95'),solar:carriedPumps('solar')},
    oils:'', oilLines:[{qty:'',price:''}],
    collections:{bank:'',petroapp:'',octane:'',petropay:''},
    collTimes:{bank:'',petroapp:'',octane:'',petropay:''},
    handover:carriedHandover(),
    expenses:[{label:'',amount:'',time:'',partnerId:''}],
    prevCash:'',bankDeposit:'',
    commission:JSON.parse(JSON.stringify(st.commission)),
    incoming:[{type:'95',qty:'',invoice:'',note:''},{type:'92',qty:'',invoice:'',note:''},{type:'solar',qty:'',invoice:'',note:''}]};
}
function ensureShiftShape(s){
  if(!s.collTimes)s.collTimes={bank:'',petroapp:'',octane:'',petropay:''};
  if(!s.handover)s.handover={startLead:'',endLead:'',start:{p95:'',p92:'',solar:''},end:{p95:'',p92:'',solar:''}};
  if(!s.oilLines)s.oilLines = (n(s.oils)>0)?[{qty:1,price:n(s.oils)}]:[{qty:'',price:''}];
  (s.expenses||[]).forEach(e=>{if(e.partnerId===undefined)e.partnerId='';});
  return s;
}
function oilsTotal(s){
  if(s.oilLines&&s.oilLines.length)return s.oilLines.reduce((a,l)=>a+n(l.qty)*n(l.price),0);
  return n(s.oils);
}
function computeShift(s){
  const pr=s.prices||{};
  const lit=f=>(s.pumps[f]||[]).reduce((a,p)=>a+Math.max(0,n(p.end)-n(p.start)),0);
  const L={p92:lit('p92'),p95:lit('p95'),solar:lit('solar')};
  const amt={p92:L.p92*n(pr.p92),p95:L.p95*n(pr.p95),solar:L.solar*n(pr.solar)};
  const oils=oilsTotal(s);
  const salesTotal=amt.p92+amt.p95+amt.solar+oils;
  const col=s.collections||{};
  const colTotal=n(col.bank)+n(col.petroapp)+n(col.octane)+n(col.petropay);
  const expTotal=sum(s.expenses||[],x=>x.amount);
  const netCash=salesTotal-colTotal-expTotal;
  const treasury=netCash+n(s.prevCash);
  const cashInHand=treasury-n(s.bankDeposit);
  const commB=(L.p92+L.p95)*n((s.commission||{}).benzeneRate);
  const commS=L.solar*n((s.commission||{}).solarRate);
  return {L,amt,oils,salesTotal,col,colTotal,expTotal,netCash,treasury,cashInHand,commB,commS,commTotal:commB+commS};
}

/* ---------- list ---------- */
VIEWS.shifts=function(){
  const sh=DB.shifts||[];
  let h=`<div class="toolbar no-print"><button class="btn btn-primary" onclick="shiftForm(-1)">${icon('clock')} ${t('new_shift_day')}</button>
    <span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span>
    <span class="spacer"></span>${sh.length?`<button class="btn" onclick="exportCSV('shifts')">${t('export_csv')}</button>`:''}</div>`;
  h+=`<div class="note no-print" style="margin-bottom:16px">${icon('file')}<div>${t('assumption_note')}</div></div>`;
  if(!sh.length)return h+`<div class="card"><div class="empty">${icon('clock')}<div>${t('no_shifts')}</div></div></div>`;
  h+=`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(330px,1fr))">`;
  sh.slice().reverse().forEach(s=>{
    const idx=sh.indexOf(s);const c=computeShift(s);
    h+=`<div class="card card-pad">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div><div style="font-weight:800;font-size:15px">${fmtDate(s.date)}</div>
        <div style="font-size:12px;color:var(--txt2)">${esc(s.lead||'')}</div></div>
        <div class="no-print" style="display:flex;gap:4px">
          <button class="btn btn-sm btn-ghost" onclick="printShift(${idx})" title="${t('print')}">${icon('file')}</button>
          ${canEdit()?`<button class="btn btn-sm btn-ghost" onclick="shiftForm(${idx})">${t('edit')}</button>
          <button class="btn btn-sm btn-ghost btn-danger" onclick="delShift2(${idx})">${t('del')}</button>`:''}</div></div>
      <table style="margin-top:12px;font-size:12.5px">
        <tr><td style="border:none;padding:4px 0">${t('shift_total')}</td><td class="t-num num" style="border:none;padding:4px 0;font-weight:800">${money(c.salesTotal)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('collections')}</td><td class="t-num num" style="border:none;padding:4px 0">${money(c.colTotal)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('expenses')}</td><td class="t-num num neg" style="border:none;padding:4px 0">${money(c.expTotal)}</td></tr>
        <tr><td style="border:none;padding:4px 0">${t('cash_in_hand')}</td><td class="t-num num pos" style="border:none;padding:4px 0;font-weight:800">${money(c.cashInHand)}</td></tr>
      </table></div>`;
  });
  return h+`</div>`;
};
function delShift2(i){if(!confirm(t('confirm_del')))return;const id=DB.shifts[i]&&DB.shifts[i]._id;DB.shifts.splice(i,1);saveDB();if(CLOUD.on)cloudDeleteShift(id);toast(t('deleted'));render();}

/* ---------- entry form ---------- */
let SHIDX=-1;
function shiftForm(idx){
  SHIDX=idx;
  window._sh = ensureShiftShape(idx>=0 ? JSON.parse(JSON.stringify(DB.shifts[idx])) : newShift());
  ROUTE='shifts';renderNav();
  const v=document.getElementById('view');v.classList.remove('anim');
  v.innerHTML=renderShiftForm();
  void v.offsetWidth;v.classList.add('anim');
  shRecalc();
}
function numCell(path,val,opt){
  opt=opt||{};
  const dis=opt.disabled?'disabled title="'+(LANG==='ar'?'يحدده المدير العام':'set by super admin')+'"':'';
  const st=opt.disabled?'style="opacity:.65;cursor:not-allowed"':'';
  return `<input class="side-in" type="number" step="any" ${dis} ${st} value="${val===''||val==null?'':val}" placeholder="${opt.ph||'0'}" oninput="shSet('${path}',this.value)">`;
}
function fuelTable(fkey){
  const s=window._sh;const label=t(fkey);const canPrice=isSuper();const P=[0,1,2,3];
  const lock=canPrice?'':' 🔒';
  return `<div class="form-sec">${t('pump_readings')} — ${label}</div>
    <table class="form-tbl"><thead><tr><th>${t('label')}</th>
      <th>${t('pump')} 1</th><th>${t('pump')} 2</th><th>${t('pump')} 3</th><th>${t('pump')} 4</th><th>${t('total')}</th></tr></thead>
    <tbody>
      <tr><td class="lbl">${t('today_morning')}</td>
        ${P.map(p=>`<td>${numCell(`pumps.${fkey}.${p}.end`,s.pumps[fkey][p].end)}</td>`).join('')}<td class="ro">—</td></tr>
      <tr><td class="lbl">${t('yest_morning')} <span style="color:var(--txt3);font-weight:600">(${t('carried')})</span></td>
        ${P.map(p=>`<td>${numCell(`pumps.${fkey}.${p}.start`,s.pumps[fkey][p].start)}</td>`).join('')}<td class="ro">—</td></tr>
      <tr><td class="lbl calc">الفرق <span style="color:var(--txt3);font-weight:600">(${t('auto')})</span></td>
        ${P.map(p=>`<td class="ro"><span id="diff_${fkey}_${p}" class="calc">0</span></td>`).join('')}
        <td class="ro"><span id="lit_${fkey}" class="calc">0</span></td></tr>
      <tr><td class="lbl">${t('price')}${lock}</td><td colspan="2">${numCell(`prices.${fkey}`,s.prices[fkey],{disabled:!canPrice})}</td>
        <td class="lbl calc">${t('amount')}</td><td colspan="2" class="ro"><span id="amt_${fkey}" class="calc">0</span></td></tr>
    </tbody></table>`;
}
function renderShiftForm(){
  const s=window._sh;
  let h=`<div class="toolbar no-print">
    <button class="btn btn-ghost" onclick="go('shifts')">← ${t('shifts')}</button>
    <span class="spacer"></span>
    <button class="btn" onclick="saveShift2(false)">${t('save')}</button>
    <button class="btn btn-primary" onclick="saveShift2(true)">${icon('file')} ${t('save_print')}</button></div>`;
  h+=`<div class="card card-pad" style="margin-bottom:16px"><div class="form-grid">
    <div class="field"><label>${t('shift_date')} <span style="color:var(--txt3);font-weight:600">(${t('auto')} — ${t('date')})</span></label><input type="date" value="${esc(s.date)}" oninput="shSet('date',this.value)"></div>
    <div class="field"><label>${t('shift_name')}</label><input value="${esc(s.lead)}" oninput="shSet('lead',this.value)"></div>
  </div></div>`;

  h+=`<div class="two-col">
    <div class="card card-pad">
      ${fuelTable('p92')}${fuelTable('p95')}${fuelTable('solar')}
      <div class="form-sec">${t('oils_sales')} <button class="btn btn-sm no-print" onclick="shAddOil()">${t('add_oil_line')}</button></div>
      <table class="form-tbl"><thead><tr><th>${t('oil_qty')}</th><th>${t('oil_price')}</th><th>${t('amount')}</th><th class="no-print"></th></tr></thead>
      <tbody>${s.oilLines.map((l,i)=>oilRow(l,i)).join('')}
        <tr><td colspan="2" class="lbl calc">${t('oils_total')}</td><td class="ro"><span id="oil_tot" class="calc">0</span></td><td class="no-print"></td></tr>
      </tbody></table>
      <div class="form-sec">${t('comm_per_liter')}${isSuper()?'':' 🔒'}</div>
      <table class="form-tbl"><tbody>
        <tr><td class="lbl">${t('comm_benzene')} (92+95)</td><td>${numCell('commission.benzeneRate',s.commission.benzeneRate,{disabled:!isSuper()})}</td>
            <td class="ro"><span id="c_commB" class="calc">0</span></td></tr>
        <tr><td class="lbl">${t('comm_solar')}</td><td>${numCell('commission.solarRate',s.commission.solarRate,{disabled:!isSuper()})}</td>
            <td class="ro"><span id="c_commS" class="calc">0</span></td></tr>
        <tr><td class="lbl calc">${t('total')}</td><td colspan="2" class="ro"><span id="c_commT" class="calc">0</span></td></tr>
      </tbody></table>

      <div class="form-sec">${t('handover')}</div>
      <table class="form-tbl"><thead><tr><th>${t('label')}</th><th>95</th><th>92</th><th>${t('solar')}</th><th>${t('shift_name')}</th></tr></thead><tbody>
        <tr><td class="lbl">${t('start_row')} <span style="color:var(--txt3);font-weight:600">(${t('carried')})</span></td>
          <td>${numCell('handover.start.p95',s.handover.start.p95)}</td>
          <td>${numCell('handover.start.p92',s.handover.start.p92)}</td>
          <td>${numCell('handover.start.solar',s.handover.start.solar)}</td>
          <td><input class="side-in" style="text-align:center" value="${esc(s.handover.startLead||'')}" oninput="shSet('handover.startLead',this.value)" placeholder="${t('shift_lead_in')}"></td></tr>
        <tr><td class="lbl">${t('end_row')}</td>
          <td>${numCell('handover.end.p95',s.handover.end.p95)}</td>
          <td>${numCell('handover.end.p92',s.handover.end.p92)}</td>
          <td>${numCell('handover.end.solar',s.handover.end.solar)}</td>
          <td><input class="side-in" style="text-align:center" value="${esc(s.handover.endLead||'')}" oninput="shSet('handover.endLead',this.value)" placeholder="${t('shift_lead_out')}"></td></tr>
      </tbody></table>
    </div>

    <div class="card card-pad">
      <div class="form-sec">${t('collections')}</div>
      <table class="form-tbl"><thead><tr><th>${t('type')}</th><th>${t('amount')}</th><th>${t('delivery_time')}</th></tr></thead><tbody>
        ${[['bank','بنك / Bank'],['petroapp',t('petroapp')],['octane',t('octane')],['petropay',t('petropay')]].map(([k,lbl])=>
          `<tr><td class="lbl">${lbl}</td><td>${numCell('collections.'+k,s.collections[k])}</td>
           <td><input class="side-in" style="text-align:center" value="${esc(s.collTimes[k]||'')}" oninput="shSet('collTimes.${k}',this.value)" placeholder="--:--"></td></tr>`).join('')}
        <tr><td class="lbl calc">${t('total')}</td><td class="ro"><span id="c_col" class="calc">0</span></td><td></td></tr>
      </tbody></table>

      <div class="form-sec">${t('expenses')} <button class="btn btn-sm no-print" onclick="shAddExp()">${t('add_expense')}</button></div>
      <table class="form-tbl"><thead><tr><th>${t('expense_line')}</th><th>${t('amount')}</th><th>${t('account')}</th><th>${t('delivery_time')}</th><th class="no-print"></th></tr></thead>
      <tbody id="expBody">${s.expenses.map((e,i)=>expRow(e,i)).join('')}
        <tr><td class="lbl calc">${t('exp_total')}</td><td class="ro"><span id="c_exp" class="calc">0</span></td><td></td><td></td><td class="no-print"></td></tr>
      </tbody></table>

      <div class="form-sec">${t('reconcile')}</div>
      <table class="form-tbl"><tbody>
        <tr><td class="lbl">${t('shift_total')} (${t('sales')})</td><td class="ro"><span id="c_sales" class="calc">0</span></td></tr>
        <tr><td class="lbl">− ${t('collections')}</td><td class="ro"><span id="c_col2">0</span></td></tr>
        <tr><td class="lbl">− ${t('expenses')}</td><td class="ro"><span id="c_exp2">0</span></td></tr>
        <tr><td class="lbl calc">= ${t('net_after_exp')} (نقدي)</td><td class="ro"><span id="c_net" class="calc">0</span></td></tr>
        <tr><td class="lbl">+ ${t('prev_cash')}</td><td>${numCell('prevCash',s.prevCash)}</td></tr>
        <tr><td class="lbl">= ${t('grand_total')} بالخزينة</td><td class="ro"><span id="c_treasury" class="calc">0</span></td></tr>
        <tr><td class="lbl">− ${t('bank_deposit')}</td><td>${numCell('bankDeposit',s.bankDeposit)}</td></tr>
        <tr><td class="lbl calc">= ${t('cash_in_hand')}</td><td class="ro"><span id="c_cash" class="calc">0</span></td></tr>
      </tbody></table>

      <div class="form-sec">${t('incoming')} <button class="btn btn-sm no-print" onclick="shAddInc()">${t('add')}</button></div>
      <table class="form-tbl"><thead><tr><th>${t('type')}</th><th>${t('qty')} (${t('liter')})</th><th>${t('invoice_no')}</th><th>${t('notes')}</th><th class="no-print"></th></tr></thead>
      <tbody id="incBody">${s.incoming.map((e,i)=>incRow(e,i)).join('')}</tbody></table>
    </div>
  </div>`;
  return h;
}
function oilRow(l,i){return `<tr>
  <td>${numCell(`oilLines.${i}.qty`,l.qty)}</td>
  <td>${numCell(`oilLines.${i}.price`,l.price)}</td>
  <td class="ro"><span id="oilamt_${i}" class="calc">0</span></td>
  <td class="no-print"><button class="btn btn-sm btn-ghost btn-danger" onclick="shDelOil(${i})">✕</button></td></tr>`;}
function partnerSelect(i,pid){
  const ps=DB.partners||[];
  return `<select class="side-in" style="text-align:center" onchange="shSet('expenses.${i}.partnerId',this.value)">
    <option value="">${t('none')}</option>
    ${ps.map(x=>`<option value="${x.id}" ${pid===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select>`;
}
function expRow(e,i){return `<tr><td><input class="side-in" style="text-align:start" value="${esc(e.label||'')}" oninput="shSet('expenses.${i}.label',this.value)"></td>
  <td>${numCell(`expenses.${i}.amount`,e.amount)}</td>
  <td>${partnerSelect(i,e.partnerId)}</td>
  <td><input class="side-in" style="text-align:center" value="${esc(e.time||'')}" oninput="shSet('expenses.${i}.time',this.value)" placeholder="--:--"></td>
  <td class="no-print"><button class="btn btn-sm btn-ghost btn-danger" onclick="shDelExp(${i})">✕</button></td></tr>`;}
function incRow(e,i){const opts=[['95','95'],['92','92'],['solar',t('solar')]];
  return `<tr><td><select class="side-in" style="text-align:center" onchange="shSet('incoming.${i}.type',this.value)">${opts.map(([v,l])=>`<option value="${v}" ${e.type===v?'selected':''}>${l}</option>`).join('')}</select></td>
  <td>${numCell(`incoming.${i}.qty`,e.qty)}</td>
  <td><input class="side-in" style="text-align:center" value="${esc(e.invoice||'')}" oninput="shSet('incoming.${i}.invoice',this.value)"></td>
  <td><input class="side-in" style="text-align:start" value="${esc(e.note||'')}" oninput="shSet('incoming.${i}.note',this.value)"></td>
  <td class="no-print"><button class="btn btn-sm btn-ghost btn-danger" onclick="shDelInc(${i})">✕</button></td></tr>`;}

function shSet(path,val){
  const parts=path.split('.');let o=window._sh;
  for(let i=0;i<parts.length-1;i++)o=o[parts[i]];
  o[parts[parts.length-1]]=val;
  shRecalc();
}
function shAddExp(){window._sh.expenses.push({label:'',amount:'',time:'',partnerId:''});reRenderForm();}
function shDelExp(i){window._sh.expenses.splice(i,1);if(!window._sh.expenses.length)window._sh.expenses.push({label:'',amount:'',time:'',partnerId:''});reRenderForm();}
function shAddOil(){window._sh.oilLines.push({qty:'',price:''});reRenderForm();}
function shDelOil(i){window._sh.oilLines.splice(i,1);if(!window._sh.oilLines.length)window._sh.oilLines.push({qty:'',price:''});reRenderForm();}
function shAddInc(){window._sh.incoming.push({type:'95',qty:'',invoice:'',note:''});reRenderForm();}
function shDelInc(i){window._sh.incoming.splice(i,1);reRenderForm();}
function reRenderForm(){const v=document.getElementById('view');v.innerHTML=renderShiftForm();shRecalc();}

function shRecalc(){
  const c=computeShift(window._sh);
  const set=(id,v,dec)=>{const e=document.getElementById(id);if(e)e.textContent=fmt(v,dec);};
  FUELS.forEach(([f])=>{
    (window._sh.pumps[f]||[]).forEach((p,i)=>{const e=document.getElementById('diff_'+f+'_'+i);if(e)e.textContent=fmt(Math.max(0,n(p.end)-n(p.start)),0);});
    set('lit_'+f,c.L[f],0);set('amt_'+f,c.amt[f],0);});
  (window._sh.oilLines||[]).forEach((l,i)=>{const e=document.getElementById('oilamt_'+i);if(e)e.textContent=fmt(n(l.qty)*n(l.price),0);});
  set('oil_tot',oilsTotal(window._sh),0);
  set('c_col',c.colTotal);set('c_col2',c.colTotal);set('c_exp',c.expTotal);set('c_exp2',c.expTotal);
  set('c_sales',c.salesTotal);set('c_net',c.netCash);set('c_treasury',c.treasury);set('c_cash',c.cashInHand);
  set('c_commB',c.commB);set('c_commS',c.commS);set('c_commT',c.commTotal);
}
function saveShift2(thenPrint){
  const s=window._sh;
  if(SHIDX>=0)DB.shifts[SHIDX]=s;else{DB.shifts.push(s);SHIDX=DB.shifts.length-1;}
  saveDB();if(CLOUD.on)cloudSaveShift(APP.active.branch,s);toast(t('saved'));
  if(thenPrint)printShift(SHIDX);else render();
}

/* ---------- printable paper layout ---------- */
function printShift(idx){
  const s=ensureShiftShape(DB.shifts[idx]);const c=computeShift(s);
  const money0=v=>fmt(v,0);
  const ct=s.collTimes||{};
  const fuelBlock=(fkey)=>{
    const p=s.pumps[fkey];
    const diff=i=>Math.max(0,n(p[i].end)-n(p[i].start));
    return `<table class="pp"><tr><th colspan="6">${t(fkey)}</th></tr>
      <tr><td class="h">${t('label')}</td><td class="h">4</td><td class="h">3</td><td class="h">2</td><td class="h">1</td><td class="h">${t('total')}</td></tr>
      <tr><td class="h">${t('today_morning')}</td>${[3,2,1,0].map(i=>`<td>${p[i].end!==''?fmt(p[i].end,0):''}</td>`).join('')}<td></td></tr>
      <tr><td class="h">${t('yest_morning')}</td>${[3,2,1,0].map(i=>`<td>${p[i].start!==''?fmt(p[i].start,0):''}</td>`).join('')}<td></td></tr>
      <tr><td class="h">الفرق</td>${[3,2,1,0].map(i=>`<td>${fmt(diff(i),0)}</td>`).join('')}<td class="b">${fmt(c.L[fkey],0)}</td></tr>
    </table>`;
  };
  const html=`<div class="print-area">
    <div class="pp-head"><div class="pp-logo">${LOGO_SVG}</div>
      <div><div class="pp-t">${t('company')} — ${esc(branchName(APP.active.branch))}</div>
      <div class="pp-s">${t('new_shift_day')} · ${fmtDate(s.date)} · ${esc(s.lead||'')}</div></div></div>
    <div class="pp-grid">
      <div class="pp-col" style="order:1">
        <table class="pp"><tr><th colspan="3">${t('collections')}</th></tr>
          <tr><td class="h">${t('delivery_time')}</td><td class="h">${t('amount')}</td><td class="h">${t('type')}</td></tr>
          <tr><td>${esc(ct.bank||'')}</td><td>${money0(s.collections.bank)}</td><td class="h">بنك</td></tr>
          <tr><td>${esc(ct.petroapp||'')}</td><td>${money0(s.collections.petroapp)}</td><td class="h">${t('petroapp')}</td></tr>
          <tr><td>${esc(ct.octane||'')}</td><td>${money0(s.collections.octane)}</td><td class="h">${t('octane')}</td></tr>
          <tr><td>${esc(ct.petropay||'')}</td><td>${money0(s.collections.petropay)}</td><td class="h">${t('petropay')}</td></tr>
          <tr><td></td><td class="b">${money0(c.colTotal)}</td><td class="h">${t('total')}</td></tr>
        </table>
        <table class="pp"><tr><th colspan="2">${t('expenses')}</th></tr>
          <tr><td class="h">${t('amount')}</td><td class="h">${t('expense_line')}</td></tr>
          ${s.expenses.filter(e=>e.label||e.amount).map(e=>`<tr><td>${money0(e.amount)}</td><td>${esc(e.label)}</td></tr>`).join('')||'<tr><td></td><td></td></tr>'}
          <tr><td class="b">${money0(c.expTotal)}</td><td class="h">${t('exp_total')}</td></tr>
        </table>
      </div>
      <div class="pp-col">
        <table class="pp"><tr><th colspan="4">${t('sales_by_product')}</th></tr>
          <tr><td class="h">${t('total')}</td><td class="h">${t('price')}</td><td class="h">${t('liters_sold')}</td><td class="h">${t('type')}</td></tr>
          <tr><td class="b">${money0(c.amt.p92)}</td><td>${fmt(s.prices.p92,2)}</td><td>${fmt(c.L.p92,0)}</td><td class="h">92</td></tr>
          <tr><td class="b">${money0(c.amt.p95)}</td><td>${fmt(s.prices.p95,2)}</td><td>${fmt(c.L.p95,0)}</td><td class="h">95</td></tr>
          <tr><td class="b">${money0(c.amt.solar)}</td><td>${fmt(s.prices.solar,2)}</td><td>${fmt(c.L.solar,0)}</td><td class="h">${t('solar')}</td></tr>
          <tr><td class="b">${money0(c.oils)}</td><td colspan="2" style="font-size:10px">${(s.oilLines||[]).filter(l=>l.qty||l.price).map(l=>`${fmt(l.qty,0)}×${fmt(l.price,2)}`).join(' + ')}</td><td class="h">${t('oils_sales')}</td></tr>
        </table>
        <table class="pp">
          <tr><td class="b">${money0(c.salesTotal)}</td><td class="h">${t('shift_total')}</td></tr>
          <tr><td>${money0(c.col.bank)}</td><td class="h">بنك</td></tr>
          <tr><td>${money0(c.col.petroapp)}</td><td class="h">${t('petroapp')}</td></tr>
          <tr><td>${money0(c.col.octane)}</td><td class="h">${t('octane')}</td></tr>
          <tr><td>${money0(c.col.petropay)}</td><td class="h">${t('petropay')}</td></tr>
          <tr><td>${money0(c.expTotal)}</td><td class="h">${t('expenses')}</td></tr>
          <tr><td class="b">${money0(c.netCash)}</td><td class="h">${t('net_after_exp')}</td></tr>
          <tr><td>${money0(s.prevCash)}</td><td class="h">${t('prev_cash')}</td></tr>
          <tr><td class="b">${money0(c.treasury)}</td><td class="h">${t('grand_total')}</td></tr>
          <tr><td>${money0(s.bankDeposit)}</td><td class="h">${t('bank_deposit')}</td></tr>
          <tr><td class="b">${money0(c.cashInHand)}</td><td class="h">${t('cash_in_hand')}</td></tr>
        </table>
        <table class="pp"><tr><th colspan="3">${t('comm_per_liter')}</th></tr>
          <tr><td class="h">${t('amount')}</td><td class="h">${t('comm_rate')}</td><td class="h">${t('liters_sold')}</td></tr>
          <tr><td>${money0(c.commB)}</td><td>${fmt(s.commission.benzeneRate,3)}</td><td>${fmt(c.L.p92+c.L.p95,0)}</td></tr>
          <tr><td>${money0(c.commS)}</td><td>${fmt(s.commission.solarRate,3)}</td><td>${fmt(c.L.solar,0)}</td></tr>
          <tr><td class="b">${money0(c.commTotal)}</td><td class="h" colspan="2">${t('total')}</td></tr>
        </table>
        <table class="pp"><tr><th colspan="4">${t('incoming')}</th></tr>
          <tr><td class="h">${t('notes')}</td><td class="h">${t('invoice_no')}</td><td class="h">${t('qty')}</td><td class="h">${t('type')}</td></tr>
          ${s.incoming.filter(e=>e.qty||e.invoice).map(e=>`<tr><td>${esc(e.note)}</td><td>${esc(e.invoice)}</td><td>${fmt(e.qty,0)}</td><td class="h">${e.type==='solar'?t('solar'):e.type}</td></tr>`).join('')||'<tr><td></td><td></td><td></td><td></td></tr>'}
        </table>
      </div>
      <div class="pp-col" style="order:-1">
        ${fuelBlock('p92')}${fuelBlock('p95')}${fuelBlock('solar')}
        <table class="pp"><tr><th colspan="5">${t('handover')}</th></tr>
          <tr><td class="h">${t('shift_name')}</td><td class="h">${t('solar')}</td><td class="h">92</td><td class="h">95</td><td class="h">${t('label')}</td></tr>
          <tr><td>${esc(s.handover.startLead||'')}</td><td>${s.handover.start.solar!==''?money0(s.handover.start.solar):''}</td><td>${s.handover.start.p92!==''?money0(s.handover.start.p92):''}</td><td>${s.handover.start.p95!==''?money0(s.handover.start.p95):''}</td><td class="h">${t('start_row')}</td></tr>
          <tr><td>${esc(s.handover.endLead||'')}</td><td>${s.handover.end.solar!==''?money0(s.handover.end.solar):''}</td><td>${s.handover.end.p92!==''?money0(s.handover.end.p92):''}</td><td>${s.handover.end.p95!==''?money0(s.handover.end.p95):''}</td><td class="h">${t('end_row')}</td></tr>
        </table>
      </div>
    </div>
    <div class="pp-foot">${t('company')} · ${esc(branchName(APP.active.branch))} · ${new Date().toLocaleString('en-GB')}</div>
  </div>`;
  const v=document.getElementById('view');
  v.innerHTML=`<div class="toolbar no-print">
    <button class="btn btn-ghost" onclick="go('shifts')">← ${t('shifts')}</button>
    <span class="spacer"></span><button class="btn btn-primary" onclick="window.print()">${icon('file')} ${t('print_shift')}</button></div>`+html;
  document.getElementById('pageTitle').textContent=t('print_shift');
  document.getElementById('pageSub').textContent=fmtDate(s.date);
}

/* ============================================================
   DIGITAL & MECHANICAL  (standalone — not tied to a shift)
   Enter digital meter readings per date; compare with the
   mechanical (shift) readings of the same date if one exists.
   Readings carry over: today's reading → tomorrow's "yesterday".
   ============================================================ */
const NOZ_LABELS=['L11','L21','L31','L41'];
let digMode='daily', digYM=null, digDate=null;

function digEntries(){ if(!DB.digitalEntries)DB.digitalEntries=[]; return DB.digitalEntries; }
function digEntryFor(date){ return digEntries().find(e=>e.date===date); }
function prevDigEntry(date){ let best=null; digEntries().forEach(e=>{ if((e.date||'')<(date||'')){ if(!best||(e.date||'')>(best.date||''))best=e; } }); return best; }
function blankDigital(carry){
  const g=(type,pi,ni,fld)=>{ try{ return carry.digital[type][pi].nozzles[ni][fld]; }catch(e){ return ''; } };
  const cv=v=>(v===undefined||v===null)?'':v;
  const bnoz=(pi,ni)=>({fuel:cv(g('benzene',pi,ni,'fuel'))||['92','92','95','95'][ni], today:'', yest:cv(g('benzene',pi,ni,'today'))});
  const snoz=(pi,ni)=>({today:'', yest:cv(g('solar',pi,ni,'today'))});
  return { benzene:[0,1,2,3].map(pi=>({nozzles:[0,1,2,3].map(ni=>bnoz(pi,ni))})),
           solar:[0,1].map(pi=>({nozzles:[0,1,2,3].map(ni=>snoz(pi,ni))})) };
}
function digTotalsOf(digital){
  const dg={p92:0,p95:0,solar:0};
  ((digital||{}).benzene||[]).forEach(p=>p.nozzles.forEach(nz=>{const d=Math.max(0,n(nz.today)-n(nz.yest));if(nz.fuel==='95')dg.p95+=d;else dg.p92+=d;}));
  ((digital||{}).solar||[]).forEach(p=>p.nozzles.forEach(nz=>{dg.solar+=Math.max(0,n(nz.today)-n(nz.yest));}));
  return dg;
}
function mechForDate(date){
  const m={p92:0,p95:0,solar:0};
  (DB.shifts||[]).filter(s=>s.date===date).forEach(s=>{const L=computeShift(s).L;m.p92+=L.p92;m.p95+=L.p95;m.solar+=L.solar;});
  return m;
}
function mechForMonth(ym){
  const m={p92:0,p95:0,solar:0};
  (DB.shifts||[]).filter(s=>(s.date||'').slice(0,7)===ym).forEach(s=>{const L=computeShift(s).L;m.p92+=L.p92;m.p95+=L.p95;m.solar+=L.solar;});
  return m;
}

VIEWS.digital_mech=function(){
  let h=printHead(t('digital_mech'));
  h+=`<div class="seg no-print" style="margin-bottom:14px">
    <button class="${digMode==='daily'?'on':''}" onclick="digMode='daily';render()">${t('daily_mode')}</button>
    <button class="${digMode==='month'?'on':''}" onclick="digMode='month';render()">${t('month_total')}</button></div>`;
  if(digMode==='month')return h+digMonthView();

  if(!digDate)digDate=new Date().toISOString().slice(0,10);
  if(!window._dig||window._digDate!==digDate)digDailyLoad();
  const dig=window._dig;
  const saved=digEntries().map(e=>e.date).sort().reverse();
  h+=`<div class="toolbar no-print">
    <div class="field" style="margin:0"><label style="display:none">d</label>
      <input type="date" value="${esc(digDate)}" oninput="digDate=this.value;digDailyLoad();render()"></div>
    ${saved.length?`<div class="field" style="margin:0;min-width:150px"><label style="display:none">s</label>
      <select onchange="digDate=this.value;digDailyLoad();render()"><option value="">— أيام مسجّلة —</option>${saved.map(d=>`<option value="${d}" ${d===digDate?'selected':''}>${fmtDate(d)}</option>`).join('')}</select></div>`:''}
    <span class="spacer"></span>
    <button class="btn btn-primary" onclick="saveDigital()">${icon('file')} ${t('save_digital')}</button>
    <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  if(!canEdit())h+=`<div class="note no-print" style="margin-bottom:14px">${icon('file')}<div>${t('digital_hidden')}</div></div>`;

  h+=`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(520px,1fr))">`;
  dig.benzene.forEach((p,pi)=>{h+=digPumpTable('benzene',pi,p,`${t('pump_n')} ${pi+1}`,true);});
  dig.solar.forEach((p,pi)=>{h+=digPumpTable('solar',pi,p,`${t('solar')} ${pi+1}`,false);});
  h+=`</div>`;

  if(canEdit()){
    const dg=digTotalsOf(dig); const mech=mechForDate(digDate); const pr=branchSettings().prices||{};
    h+=digCompareTable(dg,mech,pr,t('comparison'));
  }
  return h;
};
function digPumpTable(type,pi,pump,title,withFuel){
  const N=[0,1,2,3];
  const fuelRow=withFuel?`<tr><td class="lbl">${t('fuel_type')}</td>${N.map(ni=>`<td><select class="side-in" style="text-align:center" onchange="digSet('${type}',${pi},${ni},'fuel',this.value)">
      <option value="92" ${pump.nozzles[ni].fuel==='92'?'selected':''}>92</option><option value="95" ${pump.nozzles[ni].fuel==='95'?'selected':''}>95</option></select></td>`).join('')}</tr>`:'';
  return `<div class="card card-pad"><div class="form-sec" style="margin-top:0">${esc(title)}</div>
    <table class="form-tbl digtbl"><thead><tr><th>${t('label')}</th>${NOZ_LABELS.map(l=>`<th>${l}</th>`).join('')}</tr></thead><tbody>
      ${fuelRow}
      <tr><td class="lbl">${t('today_morning')}</td>${N.map(ni=>`<td><input class="side-in" type="number" step="any" value="${pump.nozzles[ni].today}" oninput="digSet('${type}',${pi},${ni},'today',this.value)"></td>`).join('')}</tr>
      <tr><td class="lbl">${t('yest_morning')}</td>${N.map(ni=>`<td><input class="side-in" type="number" step="any" value="${pump.nozzles[ni].yest}" oninput="digSet('${type}',${pi},${ni},'yest',this.value)"></td>`).join('')}</tr>
      <tr><td class="lbl calc">${t('diff_col')}</td>${N.map(ni=>`<td class="ro"><span id="dg_${type}_${pi}_${ni}" class="calc">0</span></td>`).join('')}</tr>
    </tbody></table></div>`;
}
function digCompareTable(dg,mech,pr,title){
  const prods=[['92','p92',pr.p92],['95','p95',pr.p95],[t('solar'),'solar',pr.solar]];
  return `<div class="card" style="margin-top:16px"><div class="card-head"><h3>${esc(title)}</h3></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('fuel_type')}</th><th class="t-num">${t('digital')}</th>
    <th class="t-num">${t('mechanical')}</th><th class="t-num">${t('diff_col')}</th><th class="t-num">${t('price')}</th><th class="t-num">${t('amount')}</th></tr></thead><tbody>
    ${prods.map(([lbl,k,price])=>{const d=dg[k],m=mech[k],diff=d-m;
      return `<tr><td class="h">${esc(lbl)}</td><td class="t-num num" style="font-weight:700;color:var(--brand2)">${fmt(d,0)}</td>
      <td class="t-num num">${fmt(m,0)}</td><td class="t-num num ${diff<0?'neg':'pos'}">${fmt(diff,0)}</td>
      <td class="t-num num">${fmt(price,2)}</td><td class="t-num num">${money(d*n(price))}</td></tr>`;}).join('')}
    </tbody></table></div></div>`;
}
function digDailyLoad(){
  const e=digEntryFor(digDate);
  window._dig = e ? JSON.parse(JSON.stringify(e.digital)) : blankDigital(prevDigEntry(digDate));
  window._digDate=digDate;
}
AFTER.digital_mech=function(){
  if(digMode!=='daily'||!window._dig)return;
  ['benzene','solar'].forEach(type=>(window._dig[type]||[]).forEach((p,pi)=>p.nozzles.forEach((nz,ni)=>{
    const el=document.getElementById(`dg_${type}_${pi}_${ni}`);if(el)el.textContent=fmt(Math.max(0,n(nz.today)-n(nz.yest)),0);})));
};
function digSet(type,pi,ni,field,val){
  window._dig[type][pi].nozzles[ni][field]=val;
  const nz=window._dig[type][pi].nozzles[ni];
  const el=document.getElementById(`dg_${type}_${pi}_${ni}`);if(el)el.textContent=fmt(Math.max(0,n(nz.today)-n(nz.yest)),0);
}
function saveDigital(){
  const entries=digEntries();
  const i=entries.findIndex(e=>e.date===digDate);
  const rec={id:(i>=0?entries[i].id:genId()),date:digDate,digital:window._dig};
  if(i>=0)entries[i]=rec;else entries.push(rec);
  saveDB();if(CLOUD.on)cloudSettingsDebounced();
  toast(t('saved'));render();
}

/* ---------- month total ---------- */
function digMonthView(){
  const set={};digEntries().forEach(e=>{if(e.date)set[e.date.slice(0,7)]=true;});
  (DB.shifts||[]).forEach(s=>{if(s.date)set[s.date.slice(0,7)]=true;});
  const months=Object.keys(set).sort().reverse();
  let h=`<div class="toolbar no-print"><span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span><span class="spacer"></span>`;
  if(!months.length)return h+`</div><div class="card"><div class="empty">${icon('grid')}<div>${t('no_shifts_month')}</div></div></div>`;
  if(!canEdit())return h+`</div><div class="card"><div class="empty">${icon('file')}<div>${t('digital_hidden')}</div></div></div>`;
  if(digYM===null||!months.includes(digYM))digYM=months[0];
  h+=`<div class="field" style="margin:0;min-width:180px"><label style="display:none">m</label>
    <select onchange="digYM=this.value;render()">${months.map(m=>`<option value="${m}" ${m===digYM?'selected':''}>${monthLabelAr(m)}</option>`).join('')}</select></div>
    <button class="btn btn-primary" onclick="window.print()">${icon('file')} ${t('print')}</button></div>`;
  const dg={p92:0,p95:0,solar:0};
  digEntries().filter(e=>(e.date||'').slice(0,7)===digYM).forEach(e=>{const d=digTotalsOf(e.digital);dg.p92+=d.p92;dg.p95+=d.p95;dg.solar+=d.solar;});
  const mech=mechForMonth(digYM); const pr=branchSettings().prices||{};
  h+=`<div class="grid kpis">
    ${kpi(t('digital'),fmt(dg.p92+dg.p95+dg.solar,0)+' '+t('liter'),'grid','ic-y')}
    ${kpi(t('mechanical'),fmt(mech.p92+mech.p95+mech.solar,0)+' '+t('liter'),'droplet','ic-b')}
  </div>`;
  h+=digCompareTable(dg,mech,pr,t('comparison')+' — '+monthLabelAr(digYM));
  return h;
}

/* ============================================================
   MONTHLY CLOSING — editable entry + auto totals + printable sheet
   Mirrors the orange "تقفيل شهر" sheet.
   ============================================================ */
const MONTH_DEFAULTS={
  fuel:['عمولة 92 الشركة','عمولة 95 الشركة','عمولة سولار الشركة','زيادة بخر 92 باللتر','زيادة بخر 95 باللتر','زيادة بخر سولار باللتر','ارضية بنزين وسولار','ربح الزيت'],
  oil:['رصيد أول المدة','مشتريات','مباع زيت','رصيد آخر المدة','الربح'],
  expenses:['مرتبات','بنزين','بوفيه','شحن كهرباء','صيانة','اكراميات','عمولة زيت','رسوم ايداع','فاتورة مياه','مصاريف اخرى','مقاولات'],
  capital:['اللي في الارض 92','اللي في الارض 95','اللي في الارض سولار','زيت','ايداع','حافز','ايجار الماركت','ايجار ATM','بون اولى انرجي']
};
function monthIncome(m){return sum(m.fuel||[],x=>x.amount);}
function monthExp(m){return sum(m.expenses||[],x=>x.amount);}
function monthProfit(m){return monthIncome(m)-monthExp(m);}
function newMonth(){
  const now=new Date();
  return {id:'m'+Date.now(),editable:true,
    month:AR_MONTHS[(now.getMonth()+1)+'']+' - '+now.getFullYear(),
    fuel:MONTH_DEFAULTS.fuel.map(l=>({label:l,liters:'',price:'',amount:''})),
    oil:MONTH_DEFAULTS.oil.map(l=>({label:l,amount:''})),
    expenses:MONTH_DEFAULTS.expenses.map(l=>({label:l,amount:''})),
    capital:MONTH_DEFAULTS.capital.map(l=>({label:l,qty:'',price:'',amount:''}))};
}

/* combined list: seeded (read-only) + editable entries */
function allMonths(){
  const seeded=(DB.monthly||[]).map((m,i)=>({key:'s'+i,title:m.title||m.sheet,obj:m,editable:false}));
  const ent=(DB.monthlyEntries||[]).map((m,i)=>({key:'e'+i,title:m.month,obj:m,editable:true,idx:i}));
  return ent.concat(seeded);
}
/* ---------- auto aggregation from daily shifts ---------- */
function shiftMonths(){
  const set={};(DB.shifts||[]).forEach(s=>{if(s.date)set[s.date.slice(0,7)]=true;});
  return Object.keys(set).sort().reverse();
}
function aggregateMonth(ym){
  const shifts=(DB.shifts||[]).filter(s=>(s.date||'').slice(0,7)===ym);
  const A={ym,count:shifts.length,L:{p92:0,p95:0,solar:0},amt:{p92:0,p95:0,solar:0},oils:0,
    col:{bank:0,petroapp:0,octane:0,petropay:0},colTotal:0,expTotal:0,commB:0,commS:0,
    salesTotal:0,netCash:0,deposits:0,incoming:{p92:0,p95:0,solar:0},expMap:{},expDetail:{}};
  shifts.forEach(s=>{
    const c=computeShift(s);
    ['p92','p95','solar'].forEach(f=>{A.L[f]+=c.L[f];A.amt[f]+=c.amt[f];});
    A.oils+=c.oils;A.salesTotal+=c.salesTotal;A.colTotal+=c.colTotal;A.expTotal+=c.expTotal;
    A.commB+=c.commB;A.commS+=c.commS;A.netCash+=c.netCash;A.deposits+=n(s.bankDeposit);
    ['bank','petroapp','octane','petropay'].forEach(k=>A.col[k]+=n((s.collections||{})[k]));
    (s.expenses||[]).forEach(e=>{if(e.label||e.amount){
      const band=e.partnerId?(((DB.partners||[]).find(x=>x.id===e.partnerId)||{}).name||e.label):e.label;
      if(band){A.expMap[band]=(A.expMap[band]||0)+n(e.amount);
        (A.expDetail[band]=A.expDetail[band]||[]).push({date:s.date,label:e.label,amount:n(e.amount)});}}});
    (s.incoming||[]).forEach(e=>{const k=e.type==='solar'?'solar':(e.type==='92'?'p92':e.type==='95'?'p95':null);if(k)A.incoming[k]+=n(e.qty);});
  });
  return A;
}
function monthLabelAr(ym){const[y,m]=ym.split('-');return (AR_MONTHS[(+m)+'']||m)+' - '+y;}

let monthMode='auto', monthKey=null, autoYM=null;
VIEWS.monthly=function(){
  let h=`<div class="seg no-print" style="margin-bottom:14px">
    <button class="${monthMode==='auto'?'on':''}" onclick="monthMode='auto';render()">${t('auto_from_shifts')}</button>
    <button class="${monthMode==='manual'?'on':''}" onclick="monthMode='manual';render()">${t('manual_imported')}</button></div>`;
  if(monthMode==='auto')return h+monthlyAuto();
  return h+monthlyManual();
};
function monthlyAuto(){
  const months=shiftMonths();
  let h=`<div class="toolbar no-print"><span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span><span class="spacer"></span>`;
  if(!months.length)return h+`</div><div class="card"><div class="empty">${icon('trending')}<div>${t('no_shifts_month')}</div></div></div>`;
  if(autoYM===null||!months.includes(autoYM))autoYM=months[0];
  h+=`<div class="field" style="margin:0;min-width:180px"><label style="display:none">m</label>
    <select onchange="autoYM=this.value;render()">${months.map(m=>`<option value="${m}" ${m===autoYM?'selected':''}>${monthLabelAr(m)}</option>`).join('')}</select></div>
    <button class="btn btn-primary" onclick="window.print()">${icon('file')} ${t('print_month')}</button></div>`;
  h+=monthAutoSheet(aggregateMonth(autoYM));
  return h;
}
function monthAutoSheet(A){
  const money0=v=>fmt(v,0);
  const incomeTotal=A.salesTotal, profit=A.salesTotal-A.expTotal;
  let h=`<div class="grid kpis" style="margin-bottom:16px">
    ${kpi(t('shifts_count'),fmt(A.count),'clock','ic-b')}
    ${kpi(t('shift_total'),money(A.salesTotal),'trending','ic-g')}
    ${kpi(t('exp_total'),money(A.expTotal),'card','ic-r')}
    ${kpi(t('net_cash'),money(A.netCash),'award','ic-y')}
    ${kpi(t('total_deposits'),money(A.deposits),'truck','ic-v')}
  </div>`;
  h+=`<div class="print-area"><div class="pp-head"><div class="pp-logo">${LOGO_SVG}</div>
    <div><div class="pp-t">${t('company')} — ${esc(branchName(APP.active.branch))}</div>
    <div class="pp-s">${t('monthly')} (${t('auto_from_shifts')}) · ${monthLabelAr(A.ym)} · ${A.count} ${t('shifts_count')}</div></div></div>`;
  h+=`<div class="pp-grid" style="grid-template-columns:1fr 1fr">
    <table class="pp"><tr><th>${t('amount')}</th><th>${t('price')}</th><th>${t('liters_sold')}</th><th>${t('sales_by_product')}</th></tr>
      <tr><td class="b">${money0(A.amt.p92)}</td><td></td><td>${money0(A.L.p92)}</td><td class="h">92</td></tr>
      <tr><td class="b">${money0(A.amt.p95)}</td><td></td><td>${money0(A.L.p95)}</td><td class="h">95</td></tr>
      <tr><td class="b">${money0(A.amt.solar)}</td><td></td><td>${money0(A.L.solar)}</td><td class="h">${t('solar')}</td></tr>
      <tr><td class="b">${money0(A.oils)}</td><td></td><td></td><td class="h">${t('oils_sales')}</td></tr>
      <tr><td class="b">${money0(incomeTotal)}</td><td colspan="3" class="h">${t('income_total')}</td></tr></table>
    <table class="pp"><tr><th>${t('amount')}</th><th>${t('collections')}</th></tr>
      <tr><td>${money0(A.col.bank)}</td><td class="h">بنك</td></tr>
      <tr><td>${money0(A.col.petroapp)}</td><td class="h">${t('petroapp')}</td></tr>
      <tr><td>${money0(A.col.octane)}</td><td class="h">${t('octane')}</td></tr>
      <tr><td>${money0(A.col.petropay)}</td><td class="h">${t('petropay')}</td></tr>
      <tr><td class="b">${money0(A.colTotal)}</td><td class="h">${t('total')}</td></tr>
      <tr><td>${money0(A.deposits)}</td><td class="h">${t('bank_deposit')}</td></tr>
      <tr><td class="b">${money0(A.netCash)}</td><td class="h">${t('net_cash')}</td></tr></table></div>`;
  const expRows=Object.keys(A.expMap).sort((a,b)=>A.expMap[b]-A.expMap[a]);
  h+=`<div class="pp-grid" style="grid-template-columns:1fr 1fr">
    <div><table class="pp"><tr><th>${t('amount')}</th><th>${t('expenses')} (${t('by_band')})</th></tr>
      ${expRows.map(k=>{const det=A.expDetail[k]||[];const detailRows=det.map(d=>`<tr style="background:var(--panel2)"><td style="font-size:10px">${money0(d.amount)}</td><td style="font-size:10px;padding-inline-start:18px">${esc(d.label)} <span style="color:#999">${d.date?fmtDate(d.date):''}</span></td></tr>`).join('');
        return `<tr class="exp-band" style="cursor:pointer" onclick="this.nextElementSibling&&this.nextElementSibling.classList.toggle('exp-hidden')"><td class="b">${money0(A.expMap[k])}</td><td class="h">▸ ${esc(k)} <span style="color:#999;font-weight:400">(${det.length})</span></td></tr>
        <tr class="exp-hidden no-print-hide"><td colspan="2" style="padding:0"><table style="width:100%;border-collapse:collapse">${detailRows}</table></td></tr>`;}).join('')||'<tr><td></td><td></td></tr>'}
      <tr><td class="b">${money0(A.expTotal)}</td><td class="h">${t('exp_total')}</td></tr></table></div>
    <div>
      <table class="pp"><tr><th>${t('amount')}</th><th>${t('comm_rate')}</th><th>${t('liters_sold')}</th><th>${t('comm_per_liter')}</th></tr>
        <tr><td>${money0(A.commB)}</td><td></td><td>${money0(A.L.p92+A.L.p95)}</td><td class="h">${t('comm_benzene')}</td></tr>
        <tr><td>${money0(A.commS)}</td><td></td><td>${money0(A.L.solar)}</td><td class="h">${t('comm_solar')}</td></tr>
        <tr><td class="b">${money0(A.commB+A.commS)}</td><td colspan="3" class="h">${t('total')}</td></tr></table>
      <table class="pp"><tr><th>${t('amount')} (${t('liter')})</th><th>${t('incoming')}</th></tr>
        <tr><td>${money0(A.incoming.p92)}</td><td class="h">92</td></tr>
        <tr><td>${money0(A.incoming.p95)}</td><td class="h">95</td></tr>
        <tr><td>${money0(A.incoming.solar)}</td><td class="h">${t('solar')}</td></tr></table>
    </div></div>`;
  h+=`<table class="pp" style="max-width:380px;margin-inline:auto"><tr>
    <td class="b" style="background:#1f9d6b;color:#fff;font-size:15px;-webkit-print-color-adjust:exact;print-color-adjust:exact">${money0(profit)}</td>
    <th style="background:#1f9d6b">${t('profit')} (${t('income_total')} − ${t('exp_total')})</th></tr></table>`;
  h+=`<div class="pp-foot">${t('company')} · ${esc(branchName(APP.active.branch))} · ${new Date().toLocaleDateString('en-GB')}</div></div>`;
  return h;
}

/* ---------- manual / imported months ---------- */
function monthlyManual(){
  const list=allMonths();
  let h=`<div class="toolbar no-print">
    <button class="btn btn-primary" onclick="monthForm(-1)">${icon('trending')} ${t('monthly_new')}</button>
    <span class="spacer"></span>`;
  if(!list.length)return h+`</div><div class="card"><div class="empty">${icon('trending')}<div>${t('no_data')}</div><div class="hint">${t('monthly_new')}</div></div></div>`;
  if(monthKey===null||!list.find(x=>x.key===monthKey))monthKey=list[0].key;
  const cur=list.find(x=>x.key===monthKey);
  h+=`<div class="field" style="margin:0;min-width:200px"><label style="display:none">m</label>
    <select onchange="monthKey=this.value;render()">${list.map(x=>`<option value="${x.key}" ${x.key===monthKey?'selected':''}>${x.editable?'✎ ':'● '}${esc(x.title)}</option>`).join('')}</select></div>`;
  if(cur.editable)h+=`<button class="btn" onclick="monthForm(${cur.idx})">${t('edit')}</button>`;
  h+=`<button class="btn btn-primary" onclick="window.print()">${icon('file')} ${t('print_month')}</button></div>`;
  h+=monthSheet(cur.obj);
  return h;
}

/* printable orange sheet (seeded or entry) */
function monthSheet(m){
  const inc=monthIncome(m),exp=monthExp(m),profit=monthProfit(m);
  const cs=m.cap_summary||{};
  const money0=v=>fmt(v,0);
  let h=`<div class="print-area"><div class="pp-head"><div class="pp-logo">${LOGO_SVG}</div>
    <div><div class="pp-t">${t('company')} — ${esc(branchName(APP.active.branch))}</div>
    <div class="pp-s">${t('monthly')} · ${esc(m.title||m.month||'')}</div></div></div>`;
  h+=`<div class="pp-grid" style="grid-template-columns:1fr 1fr">
    <table class="pp"><tr><th>${t('amount')}</th><th>${t('price')}</th><th>${t('liters_k')}</th><th>وارد البنزين</th></tr>
      ${(m.fuel||[]).map(f=>`<tr><td class="b">${money0(f.amount)}</td><td>${f.price!=null&&f.price!==''?fmt(f.price,2):''}</td><td>${f.liters!=null&&f.liters!==''?fmt(f.liters,0):''}</td><td class="h">${esc(f.label)}</td></tr>`).join('')}
      <tr><td class="b">${money0(inc)}</td><td colspan="3" class="h">${t('income_total')}</td></tr></table>
    <table class="pp"><tr><th>${t('amount')}</th><th>${t('expenses')}</th></tr>
      ${(m.expenses||[]).map(e=>`<tr><td>${money0(e.amount)}</td><td class="h">${esc(e.label)}</td></tr>`).join('')}
      <tr><td class="b">${money0(exp)}</td><td class="h">${t('exp_total')}</td></tr></table>
  </div>`;
  if((m.capital||[]).length||Object.keys(cs).length){
    h+=`<div class="pp-grid" style="grid-template-columns:1fr 1fr">
      <table class="pp"><tr><th>${t('amount')}</th><th>${t('price')}</th><th>${t('qty')}</th><th>تقفيل رأس المال</th></tr>
        ${(m.capital||[]).map(c=>`<tr><td class="b">${money0(c.amount)}</td><td>${c.price!=null&&c.price!==''?fmt(c.price,2):''}</td><td>${c.qty!=null&&c.qty!==''?fmt(c.qty,0):''}</td><td class="h">${esc(c.label)}</td></tr>`).join('')}
        ${cs['اجمالي رأس المال']!=null?`<tr><td class="b" colspan="3">${money0(cs['اجمالي رأس المال'])}</td><td class="h">اجمالي رأس المال</td></tr>`:''}
        ${cs['مديونية الشركة']!=null?`<tr><td colspan="3">${money0(cs['مديونية الشركة'])}</td><td class="h">مديونية الشركة</td></tr>`:''}
        ${cs['صافي رأس المال']!=null?`<tr><td class="b" colspan="3">${money0(cs['صافي رأس المال'])}</td><td class="h">صافي رأس المال</td></tr>`:''}
      </table>
      <table class="pp"><tr><th>${t('amount')}</th><th>${t('oil_income')}</th></tr>
        ${(m.oil||[]).map(o=>`<tr><td>${money0(o.amount)}</td><td class="h">${esc(o.label)}</td></tr>`).join('')||'<tr><td></td><td></td></tr>'}
      </table></div>`;
  }
  h+=`<table class="pp" style="max-width:360px;margin-inline:auto"><tr>
    <td class="b" style="background:#1f9d6b;color:#fff;font-size:15px;-webkit-print-color-adjust:exact;print-color-adjust:exact">${money0(profit)}</td>
    <th style="background:#1f9d6b">${t('profit')}</th></tr></table>`;
  h+=`<div class="pp-foot">${t('company')} · ${esc(branchName(APP.active.branch))} · ${new Date().toLocaleDateString('en-GB')}</div></div>`;
  return h;
}

/* editable form */
let MONIDX=-1;
function monthForm(idx){
  MONIDX=idx;
  window._mo = idx>=0 ? JSON.parse(JSON.stringify(DB.monthlyEntries[idx])) : newMonth();
  ROUTE='monthly';renderNav();
  const v=document.getElementById('view');v.classList.remove('anim');
  v.innerHTML=renderMonthForm();void v.offsetWidth;v.classList.add('anim');
  moRecalc();
}
function moNum(path,val){return `<input class="side-in" type="number" step="any" value="${val===''||val==null?'':val}" oninput="moSet('${path}',this.value)">`;}
function renderMonthForm(){
  const m=window._mo;
  let h=`<div class="toolbar no-print"><button class="btn btn-ghost" onclick="go('monthly')">← ${t('monthly')}</button>
    <span class="spacer"></span><button class="btn btn-primary" onclick="saveMonth()">${t('save')}</button></div>`;
  h+=`<div class="card card-pad" style="margin-bottom:16px"><div class="field"><label>${t('month')}</label>
    <input value="${esc(m.month)}" oninput="moSet('month',this.value)" style="max-width:280px"></div></div>`;
  h+=`<div class="two-col"><div class="card card-pad">
    <div class="form-sec">إيرادات الوقود — ${t('income_total')}</div>
    <table class="form-tbl"><thead><tr><th>البيان</th><th>${t('liters_k')}</th><th>${t('price')}</th><th>${t('amount')}</th></tr></thead>
    <tbody>${m.fuel.map((f,i)=>`<tr><td><input class="side-in" style="text-align:start" value="${esc(f.label)}" oninput="moSet('fuel.${i}.label',this.value)"></td>
      <td>${moNum('fuel.'+i+'.liters',f.liters)}</td><td>${moNum('fuel.'+i+'.price',f.price)}</td><td>${moNum('fuel.'+i+'.amount',f.amount)}</td></tr>`).join('')}
      <tr><td colspan="3" class="lbl calc">${t('income_total')}</td><td class="ro"><span id="mo_inc" class="calc">0</span></td></tr></tbody></table>
    <div class="form-sec">${t('oil_income')}</div>
    <table class="form-tbl"><tbody>${m.oil.map((o,i)=>`<tr><td class="lbl"><input class="side-in" style="text-align:start" value="${esc(o.label)}" oninput="moSet('oil.${i}.label',this.value)"></td><td>${moNum('oil.'+i+'.amount',o.amount)}</td></tr>`).join('')}</tbody></table>
  </div><div class="card card-pad">
    <div class="form-sec">${t('expenses')} <button class="btn btn-sm no-print" onclick="moAdd('expenses')">${t('add_expense')}</button></div>
    <table class="form-tbl"><thead><tr><th>${t('expense_line')}</th><th>${t('amount')}</th><th class="no-print"></th></tr></thead>
    <tbody>${m.expenses.map((e,i)=>`<tr><td><input class="side-in" style="text-align:start" value="${esc(e.label)}" oninput="moSet('expenses.${i}.label',this.value)"></td>
      <td>${moNum('expenses.'+i+'.amount',e.amount)}</td><td class="no-print"><button class="btn btn-sm btn-ghost btn-danger" onclick="moDel('expenses',${i})">✕</button></td></tr>`).join('')}
      <tr><td class="lbl calc">${t('exp_total')}</td><td class="ro"><span id="mo_exp" class="calc">0</span></td><td class="no-print"></td></tr></tbody></table>
    <div class="form-sec">تقفيل رأس المال <button class="btn btn-sm no-print" onclick="moAdd('capital')">${t('add')}</button></div>
    <table class="form-tbl"><thead><tr><th>البيان</th><th>${t('qty')}</th><th>${t('price')}</th><th>${t('amount')}</th><th class="no-print"></th></tr></thead>
    <tbody>${m.capital.map((c,i)=>`<tr><td><input class="side-in" style="text-align:start" value="${esc(c.label)}" oninput="moSet('capital.${i}.label',this.value)"></td>
      <td>${moNum('capital.'+i+'.qty',c.qty)}</td><td>${moNum('capital.'+i+'.price',c.price)}</td><td>${moNum('capital.'+i+'.amount',c.amount)}</td>
      <td class="no-print"><button class="btn btn-sm btn-ghost btn-danger" onclick="moDel('capital',${i})">✕</button></td></tr>`).join('')}</tbody></table>
    <div class="card card-pad" style="background:var(--panel2);margin-top:14px"><table style="font-size:14px;width:100%">
      <tr><td style="border:none;padding:4px 0">${t('income_total')}</td><td class="t-num num" id="mo_inc2" style="border:none;padding:4px 0"></td></tr>
      <tr><td style="border:none;padding:4px 0">${t('exp_total')}</td><td class="t-num num neg" id="mo_exp2" style="border:none;padding:4px 0"></td></tr>
      <tr><td style="border:none;padding:4px 0;font-weight:800">${t('profit')}</td><td class="t-num num pos" id="mo_profit" style="border:none;padding:4px 0;font-weight:800;font-size:16px"></td></tr>
    </table></div>
  </div></div>`;
  return h;
}
function moSet(path,val){const p=path.split('.');let o=window._mo;for(let i=0;i<p.length-1;i++)o=o[p[i]];o[p[p.length-1]]=val;moRecalc();}
function moAdd(k){window._mo[k].push(k==='capital'?{label:'',qty:'',price:'',amount:''}:{label:'',amount:''});const v=document.getElementById('view');v.innerHTML=renderMonthForm();moRecalc();}
function moDel(k,i){window._mo[k].splice(i,1);const v=document.getElementById('view');v.innerHTML=renderMonthForm();moRecalc();}
function moRecalc(){
  const inc=monthIncome(window._mo),exp=monthExp(window._mo);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=money(v);};
  set('mo_inc',inc);set('mo_inc2',inc);set('mo_exp',exp);set('mo_exp2',exp);set('mo_profit',inc-exp);
}
function saveMonth(){
  const m=window._mo;
  if(MONIDX>=0)DB.monthlyEntries[MONIDX]=m;else DB.monthlyEntries.push(m);
  monthKey= MONIDX>=0?'e'+MONIDX:'e'+(DB.monthlyEntries.length-1);
  saveDB();if(CLOUD.on)cloudSaveMonthly(APP.active.branch,m);toast(t('saved'));go('monthly');
}

/* ============================================================
   STAFF / PARTNER ACCOUNTS
   Each person has an account; shift expenses tagged to them
   post automatically, plus manual advances/repayments.
   ============================================================ */
function partnerBalance(pid){
  let take=0,repay=0;
  (DB.shifts||[]).forEach(s=>(s.expenses||[]).forEach(e=>{if(e.partnerId===pid)take+=n(e.amount);}));
  (DB.partnerTxns||[]).forEach(x=>{if(x.partnerId===pid){if(x.type==='repay')repay+=n(x.amount);else take+=n(x.amount);}});
  return {take,repay,balance:take-repay};
}
function partnerLedger(pid){
  const rows=[];
  (DB.shifts||[]).forEach(s=>(s.expenses||[]).forEach(e=>{
    if(e.partnerId===pid&&(e.label||e.amount))rows.push({date:s.date,desc:e.label||t('from_shift'),amount:n(e.amount),type:'take',src:'shift'});}));
  (DB.partnerTxns||[]).forEach(x=>{if(x.partnerId===pid)rows.push({date:x.date,desc:x.desc,amount:n(x.amount),type:x.type,src:'manual',id:x.id});});
  rows.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  return rows;
}

let partnerOpen=null;
VIEWS.partners=function(){
  if(partnerOpen&&(DB.partners||[]).find(p=>p.id===partnerOpen))return partnerDetail(partnerOpen);
  partnerOpen=null;
  const ps=DB.partners||[];
  let h=`<div class="toolbar no-print"><button class="btn btn-primary" onclick="editPartner(null)">${icon('wallet')} ${t('add_partner')}</button>
    <span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span></div>`;
  h+=`<div class="note no-print" style="margin-bottom:16px">${icon('file')}<div>${t('partner_note')}</div></div>`;
  if(!ps.length)return h+`<div class="card"><div class="empty">${icon('wallet')}<div>${t('no_data')}</div><div class="hint">${t('add_partner')}</div></div></div>`;
  h+=`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">`;
  ps.forEach(p=>{const b=partnerBalance(p.id);
    h+=`<div class="card card-pad">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="font-weight:800;font-size:16px">${esc(p.name)}</div>
        <div class="no-print" style="display:flex;gap:4px">
          <button class="btn btn-sm btn-ghost" onclick="editPartner('${p.id}')">${t('edit')}</button>
          <button class="btn btn-sm btn-ghost btn-danger" onclick="delPartner('${p.id}')">${t('del')}</button></div></div>
      <div style="margin:14px 0;padding:14px;border-radius:12px;background:var(--panel2);text-align:center">
        <div style="font-size:11.5px;color:var(--txt2);font-weight:600">${t('balance_due')}</div>
        <div class="num" style="font-size:24px;font-weight:800;color:${b.balance>0?'var(--red)':'var(--green)'}">${money(b.balance)}</div></div>
      <table style="font-size:12.5px;width:100%"><tr><td style="border:none;padding:3px 0">${t('taken')}</td><td class="t-num num" style="border:none;padding:3px 0">${money(b.take)}</td></tr>
        <tr><td style="border:none;padding:3px 0">${t('repaid')}</td><td class="t-num num" style="border:none;padding:3px 0">${money(b.repaid)}</td></tr></table>
      <button class="btn no-print" style="width:100%;justify-content:center;margin-top:12px" onclick="openPartner('${p.id}')">${t('open_account')} →</button></div>`;
  });
  return h+`</div>`;
};
function openPartner(pid){partnerOpen=pid;render();}
function editPartner(id){
  const p=id?(DB.partners||[]).find(x=>x.id===id):{name:''};
  modal(id?t('edit'):t('add_partner'),
    `<div class="field"><label>${t('person')}</label><input id="pr_name" value="${esc(p.name||'')}" autofocus></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="savePartner(${id?`'${id}'`:'null'})">${t('save')}</button>`);
}
function savePartner(id){
  const name=document.getElementById('pr_name').value.trim();if(!name){toast(t('person')+' ?','err');return;}
  if(id){const p=DB.partners.find(x=>x.id===id);if(p)p.name=name;}
  else DB.partners.push({id:genId(),name});
  saveDB();if(CLOUD.on)cloudSaveSettings(APP.active.branch,branchSettings());closeModal();toast(t('saved'));render();
}
function delPartner(id){if(!confirm(t('confirm_del')))return;
  DB.partners=DB.partners.filter(x=>x.id!==id);
  DB.partnerTxns=(DB.partnerTxns||[]).filter(x=>x.partnerId!==id);
  saveDB();if(CLOUD.on)cloudSaveSettings(APP.active.branch,branchSettings());toast(t('deleted'));render();}

function partnerDetail(pid){
  const p=(DB.partners||[]).find(x=>x.id===pid);if(!p){partnerOpen=null;return render(),'';}
  const b=partnerBalance(pid);const rows=partnerLedger(pid);
  let h=`<div class="toolbar no-print"><button class="btn btn-ghost" onclick="partnerOpen=null;render()">← ${t('partners')}</button>
    <span class="spacer"></span><button class="btn btn-primary" onclick="addPartnerTxn('${pid}')">${t('add_txn')}</button>
    <button class="btn" onclick="window.print()">${t('print')}</button></div>`;
  h+=printHead(t('account')+' — '+p.name);
  h+=`<div class="grid kpis">
    ${kpi(t('taken'),money(b.take),'wallet','ic-r')}
    ${kpi(t('repaid'),money(b.repaid),'card','ic-g')}
    ${kpi(t('balance_due'),money(b.balance),'award',b.balance>0?'ic-r':'ic-g')}
  </div>`;
  let run=0;
  h+=`<div class="card" style="margin-top:16px"><div class="card-head"><h3>${esc(p.name)}</h3></div>
    <div class="tbl-wrap"><table><thead><tr><th>${t('date')}</th><th>${t('description')}</th><th>${t('type')}</th>
    <th class="t-num">${t('amount')}</th><th class="t-num">${t('balance')}</th><th class="no-print"></th></tr></thead><tbody>
    ${rows.map(r=>{run+=(r.type==='repay'?-n(r.amount):n(r.amount));
      return `<tr><td class="num">${fmtDate(r.date)}</td><td>${esc(r.desc)}</td>
        <td><span class="tag ${r.type==='repay'?'tag-in':'tag-out'}">${r.type==='repay'?t('repay'):t('take_adv')}</span>${r.src==='shift'?` <span class="badge">${t('from_shift')}</span>`:''}</td>
        <td class="t-num num ${r.type==='repay'?'pos':'neg'}">${r.type==='repay'?'−':'+'}${fmt(r.amount)}</td>
        <td class="t-num num">${fmt(run)}</td>
        <td class="no-print">${r.src==='manual'?`<button class="btn btn-sm btn-ghost btn-danger" onclick="delPartnerTxn('${r.id}')">${t('del')}</button>`:''}</td></tr>`;}).join('')
      ||`<tr><td colspan="6" class="empty">${t('no_data')}</td></tr>`}
    </tbody><tfoot><tr><td colspan="4">${t('balance_due')}</td><td class="t-num num">${fmt(b.balance)}</td><td class="no-print"></td></tr></tfoot></table></div></div>`;
  return h;
}
function addPartnerTxn(pid){
  modal(t('add_txn'),
    `<div class="form-grid">
      <div class="field"><label>${t('date')}</label><input id="pt_date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="field"><label>${t('type')}</label><select id="pt_type">
        <option value="take">${t('take_adv')}</option><option value="repay">${t('repay')}</option></select></div>
    </div>
    <div class="field"><label>${t('description')}</label><input id="pt_desc"></div>
    <div class="field"><label>${t('amount')}</label><input id="pt_amount" type="number" step="any"></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="savePartnerTxn('${pid}')">${t('save')}</button>`);
}
function savePartnerTxn(pid){
  const g=id=>document.getElementById(id).value;
  const rec={id:genId(),partnerId:pid,date:g('pt_date'),type:g('pt_type'),desc:g('pt_desc'),amount:n(g('pt_amount'))};
  if(!rec.amount){toast(t('amount')+' ?','err');return;}
  DB.partnerTxns=DB.partnerTxns||[];DB.partnerTxns.push(rec);
  saveDB();if(CLOUD.on)cloudSaveSettings(APP.active.branch,branchSettings());closeModal();toast(t('saved'));render();
}
function delPartnerTxn(id){if(!confirm(t('confirm_del')))return;
  DB.partnerTxns=(DB.partnerTxns||[]).filter(x=>x.id!==id);
  saveDB();if(CLOUD.on)cloudSaveSettings(APP.active.branch,branchSettings());toast(t('deleted'));render();}

/* ============================================================
   INCOME & EXPENSE daily ledger  +  CURRENT STOCK
   Both aggregate automatically from the shifts.
   ============================================================ */
function openingStock(){const s=branchSettings();if(!s.openingStock)s.openingStock={p92:'',p95:'',solar:''};return s.openingStock;}

function ledgerManual(){ if(!DB.ledgerManual)DB.ledgerManual=[]; return DB.ledgerManual; }
function ledgerRows(ym){
  const rows=[];
  (DB.shifts||[]).filter(s=>(s.date||'').slice(0,7)===ym)
    .sort((a,b)=>(a.date||'').localeCompare(b.date||'')).forEach(s=>{
    const c=computeShift(s);const col=s.collections||{};const ct=s.collTimes||{};
    const addI=(amt,label,note)=>{if(n(amt))rows.push({date:s.date,income:n(amt),label,note:note||''});};
    addI(col.bank,'فيزا / بنك',ct.bank);
    addI(col.petroapp,t('petroapp'),ct.petroapp);
    addI(col.octane,t('octane'),ct.octane);
    addI(col.petropay,t('petropay'),ct.petropay);
    if(c.oils)rows.push({date:s.date,income:c.oils,label:'زيت',note:(s.oilLines||[]).filter(l=>l.qty).map(l=>`${fmt(l.qty,0)}*${fmt(l.price,0)}`).join(' + ')});
    (s.expenses||[]).forEach(e=>{if(e.label||e.amount){
      const pn=e.partnerId?((DB.partners||[]).find(x=>x.id===e.partnerId)||{}).name:'';
      rows.push({date:s.date,expense:n(e.amount),label:e.label,note:[pn,e.time].filter(Boolean).join(' · ')});}});
  });
  // manual entries (recorded directly on this page)
  ledgerManual().filter(e=>(e.date||'').slice(0,7)===ym).forEach(e=>{
    const r={date:e.date,label:e.label,note:e.note||'',manual:true,id:e.id};
    if(e.kind==='income')r.income=n(e.amount);else r.expense=n(e.amount);
    rows.push(r);
  });
  rows.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  return rows;
}

let ieYM=null;
function ieMonths(){
  const set={};
  (DB.shifts||[]).forEach(s=>{if(s.date)set[s.date.slice(0,7)]=true;});
  ledgerManual().forEach(e=>{if(e.date)set[e.date.slice(0,7)]=true;});
  const arr=Object.keys(set).sort().reverse();
  const cur=new Date().toISOString().slice(0,7);
  if(!arr.includes(cur))arr.unshift(cur);
  return arr;
}
VIEWS.income_expense=function(){
  const months=ieMonths();
  let h=printHead(t('income_expense'));
  h+=`<div class="note no-print" style="margin-bottom:14px">${icon('card')}<div>${t('ie_note')}</div></div>`;
  if(ieYM===null||!months.includes(ieYM))ieYM=months[0];
  h+=`<div class="toolbar no-print"><span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span>
    <div class="field" style="margin:0;min-width:180px"><label style="display:none">m</label>
    <select onchange="ieYM=this.value;render()">${months.map(m=>`<option value="${m}" ${m===ieYM?'selected':''}>${monthLabelAr(m)}</option>`).join('')}</select></div>
    <span class="spacer"></span>
    ${canEdit()?`<button class="btn btn-primary" onclick="ieEntryForm()">${icon('card')} ${t('add_entry')}</button>`:''}
    <button class="btn" onclick="exportCSV('ledger')">${t('export_csv')}</button>
    <button class="btn" onclick="window.print()">${icon('file')} ${t('print')}</button></div>`;
  const rows=ledgerRows(ieYM);
  const totI=sum(rows,r=>r.income),totE=sum(rows,r=>r.expense);
  h+=`<div class="grid kpis">
    ${kpi(t('total_income'),money(totI),'trending','ic-g')}
    ${kpi(t('total_expense'),money(totE),'card','ic-r')}
    ${kpi(t('net_cash'),money(totI-totE),'award','ic-y')}
  </div>`;
  let lastDate=null;
  h+=`<div class="card" style="margin-top:16px"><div class="tbl-wrap"><table><thead><tr>
    <th>${t('date')}</th><th class="t-num">${t('income_col')}</th><th class="t-num">${t('expense_col')}</th>
    <th>${t('label')}</th><th>${t('notes')}</th><th class="no-print"></th></tr></thead><tbody>
    ${rows.map(r=>{const show=r.date!==lastDate;lastDate=r.date;
      return `<tr><td class="num">${show?fmtDate(r.date):''}</td>
      <td class="t-num num ${r.income?'pos':''}">${r.income?fmt(r.income):''}</td>
      <td class="t-num num ${r.expense?'neg':''}">${r.expense?fmt(r.expense):''}</td>
      <td>${esc(r.label)}${r.manual?` <span class="pill" style="font-size:10px;padding:1px 6px">${t('manual_tag')}</span>`:''}</td>
      <td style="color:var(--txt2);font-size:12px">${esc(r.note)}</td>
      <td class="no-print">${r.manual&&canEdit()?`<button class="btn btn-sm btn-ghost btn-danger" onclick="ieDel('${r.id}')">${t('del')}</button>`:''}</td></tr>`;}).join('')
      ||`<tr><td colspan="6" class="empty">${t('no_data')}</td></tr>`}
    </tbody><tfoot><tr><td>${t('total')}</td><td class="t-num num pos">${fmt(totI)}</td>
    <td class="t-num num neg">${fmt(totE)}</td><td colspan="3"></td></tr></tfoot></table></div></div>`;
  return h;
};
function ieEntryForm(){
  const d=new Date().toISOString().slice(0,10);
  modal(t('add_entry'),
    `<div class="form-grid">
      <div class="field"><label>${t('date')}</label><input id="ie_date" type="date" value="${d}"></div>
      <div class="field"><label>${t('entry_type')}</label><select id="ie_kind">
        <option value="expense">${t('entry_expense')}</option><option value="income">${t('entry_income')}</option></select></div>
      <div class="field"><label>${t('amount')}</label><input id="ie_amt" type="number" step="any" placeholder="0"></div>
    </div>
    <div class="field"><label>${t('label')}</label><input id="ie_label" placeholder="${t('expense_line')}"></div>
    <div class="field"><label>${t('notes')}</label><input id="ie_note"></div>`,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="ieSave()">${t('save')}</button>`);
}
function ieSave(){
  const g=id=>document.getElementById(id).value;
  const amt=g('ie_amt');
  if(amt===''||!n(amt)){toast(t('amount')+' ؟','err');return;}
  const rec={id:genId(),date:g('ie_date'),kind:g('ie_kind'),amount:n(amt),label:g('ie_label')||(g('ie_kind')==='income'?t('entry_income'):t('entry_expense')),note:g('ie_note')};
  ledgerManual().push(rec);
  saveDB();if(CLOUD.on)cloudSettingsDebounced();
  closeModal();toast(t('saved'));render();
}
function ieDel(id){
  if(!confirm(t('del_confirm')))return;
  DB.ledgerManual=ledgerManual().filter(e=>e.id!==id);
  saveDB();if(CLOUD.on)cloudSettingsDebounced();
  toast(t('saved'));render();
}

/* ---------- current stock (fuel) ---------- */
function stockSummary(){
  const op=openingStock();
  const inc={p92:0,p95:0,solar:0},sold={p92:0,p95:0,solar:0};
  (DB.shifts||[]).forEach(s=>{const c=computeShift(s);
    sold.p92+=c.L.p92;sold.p95+=c.L.p95;sold.solar+=c.L.solar;
    (s.incoming||[]).forEach(e=>{const k=e.type==='solar'?'solar':e.type==='92'?'p92':e.type==='95'?'p95':null;if(k)inc[k]+=n(e.qty);});
  });
  return [['1','بنزين 92','p92'],['2','بنزين 95','p95'],['3','سولار','solar']].map(([code,name,k])=>
    ({code,name,k,open:n(op[k]),inc:inc[k],sold:sold[k],cur:n(op[k])+inc[k]-sold[k]}));
}
function setOpenStock(k,v){openingStock()[k]=v===''?'':n(v);saveDB();cloudSettingsDebounced();}

/* ============================================================
   AUTH VIEWS: login screen, users management, branch photos
   ============================================================ */
function showLogin(){
  document.getElementById('app').style.display='none';
  document.querySelectorAll('#branchSlot,#userSlot').forEach(e=>e.innerHTML='');
  const ls=document.getElementById('loginScreen');
  ls.style.display='grid';
  const cloudBadge=cloudConfigured()
    ?`<span class="badge" style="background:var(--greenbg);color:var(--green);border-color:transparent">● ${t('cloud_mode')}</span>`
    :`<span class="badge">${t('local_mode')}</span>`;
  ls.innerHTML=`<form class="login-card" onsubmit="return doLogin(event)">
    <div class="login-logo">${LOGO_SVG}</div>
    <h2>${t('company')}</h2><div class="ls">${t('login_sub')}</div>
    <div style="text-align:center;margin-bottom:14px">${cloudBadge}</div>
    <div class="login-err" id="loginErr">${t('login_err')}</div>
    <div class="field"><label>${t('username')}</label><input id="li_user" autocomplete="username" autofocus></div>
    <div class="field"><label>${t('password')}</label><input id="li_pass" type="password" autocomplete="current-password"></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:6px" type="submit">${t('login')}</button>
    <div class="login-hint">${cloudConfigured()?'':t('login_hint')}</div>
    <div style="text-align:center;margin-top:14px"><button type="button" class="btn btn-ghost btn-sm" onclick="cloudSetupModal()">${icon('truck')} ${t('cloud_setup')}</button></div>
  </form>`;
  document.documentElement.setAttribute('data-theme',THEME);
  document.documentElement.dir=LANG==='ar'?'rtl':'ltr';document.body.dir=document.documentElement.dir;
  const sp=document.getElementById('splash');if(sp)sp.remove();
}
function firstAllowedRoute(){const a=allowedPages();if(!a)return 'dashboard';return a.includes('dashboard')?'dashboard':a[0];}
async function doLogin(e){
  e.preventDefault();
  const u=document.getElementById('li_user').value,p=document.getElementById('li_pass').value;
  const er=document.getElementById('loginErr');
  const fail=(msg)=>{er.textContent=msg||t('login_err');er.style.display='block';const pw=document.getElementById('li_pass');if(pw)pw.value='';};
  if(cloudConfigured()){
    try{
      if(!CLOUD.sb)await cloudInit();
      const user=await cloudLogin(u,p);
      if(!user)return fail(),false;
      await cloudLoadAll(user);
      USER={id:user.id,username:user.username,role:user.role,branchId:user.branch_id,name:user.name,pages:user.pages||null};
      syncDB();
      document.getElementById('loginScreen').style.display='none';
      document.getElementById('app').style.display='';
      ROUTE=firstAllowedRoute();renderNav();render();
    }catch(err){fail(((err&&err.message)||err));}
    return false;
  }
  if(login(u,p)){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('app').style.display='';
    ROUTE=firstAllowedRoute();renderNav();render();
  } else fail();
  return false;
}

/* ---------------- USERS (super admin only) ---------------- */
VIEWS.users=function(){
  if(!isSuper())return `<div class="card"><div class="empty">${t('no_data')}</div></div>`;
  let h=`<div class="toolbar no-print"><button class="btn btn-primary" onclick="editUser(null)">${icon('users')} ${t('add_user')}</button></div>`;
  h+=`<div class="card"><div class="tbl-wrap"><table><thead><tr>
    <th>${t('full_name')}</th><th>${t('username')}</th><th>${t('password')}</th><th>${t('role')}</th><th>${t('branch')}</th><th class="no-print"></th></tr></thead><tbody>
    ${APP.users.map(u=>`<tr><td>${esc(u.name||'—')}</td><td class="num">${esc(u.username)}</td>
      <td class="num">${'•'.repeat(Math.min(8,(u.password||'').length))}</td>
      <td><span class="role-badge">${u.role==='super'?t('super_admin'):u.role==='entry'?t('data_entry'):t('branch_user')}</span></td>
      <td>${u.role==='super'?t('all_branches'):esc(branchName(u.branchId))}${(Array.isArray(u.pages)&&u.pages.length)?` <span class="badge">${u.pages.length} صفحة</span>`:''}</td>
      <td class="no-print"><button class="btn btn-sm btn-ghost" onclick="editUser('${u.id}')">${t('edit')}</button>
      ${(u.id===(USER&&USER.id))?'':`<button class="btn btn-sm btn-ghost btn-danger" onclick="rmUser('${u.id}')">${t('del')}</button>`}</td></tr>`).join('')}
    </tbody></table></div></div>`;
  h+=`<div class="note no-print" style="margin-top:16px">${icon('file')}<div>${t('disclaimer')}</div></div>`;
  return h;
};
const PAGE_LIST=[['dashboard'],['inventory'],['shifts'],['tanks'],['images'],['income_expense'],['monthly'],['commission'],['channels'],['supplier'],['partners'],['reports'],['importexport']];
function editUser(id){
  const u=id?APP.users.find(x=>x.id===id):{name:'',username:'',password:'',role:'branch',branchId:'b1',pages:null};
  const pages=Array.isArray(u.pages)?u.pages:null;
  const body=`<div class="field"><label>${t('full_name')}</label><input id="u_name" value="${esc(u.name||'')}"></div>
    <div class="form-grid">
    <div class="field"><label>${t('username')}</label><input id="u_user" value="${esc(u.username||'')}"></div>
    <div class="field"><label>${t('password')}</label><input id="u_pass" value="${esc(u.password||'')}"></div>
    </div>
    <div class="form-grid">
    <div class="field"><label>${t('role')}</label><select id="u_role" onchange="uRoleChange(this.value)">
      <option value="branch" ${u.role==='branch'?'selected':''}>${t('branch_user')}</option>
      <option value="entry" ${u.role==='entry'?'selected':''}>${t('data_entry')}</option>
      <option value="super" ${u.role==='super'?'selected':''}>${t('super_admin')}</option></select></div>
    <div class="field" id="u_branch_wrap" style="${u.role==='super'?'display:none':''}"><label>${t('branch')}</label>
      <select id="u_branch">${APP.branches.map(b=>`<option value="${b.id}" ${b.id===u.branchId?'selected':''}>${esc(b.name)}</option>`).join('')}</select></div>
    </div>
    <div id="u_pages_wrap" style="${u.role==='super'?'display:none':''}">
      <div class="field" style="margin-bottom:6px"><label>${t('allowed_pages')}</label>
        <div class="hint" style="margin-bottom:8px">${t('all_pages')} — سيب الكل فاضي = كل الصفحات</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:4px 12px">
        ${PAGE_LIST.map(([k])=>`<label style="display:flex;align-items:center;gap:7px;font-weight:600;font-size:12.5px;cursor:pointer">
          <input type="checkbox" class="u_page" value="${k}" ${pages&&pages.includes(k)?'checked':''} style="width:auto"> ${t(k)}</label>`).join('')}
        </div></div>
    </div>
    <div class="note" style="border-inline-start-color:var(--amber)">${icon('file')}<div>${t('entry_hint')}</div></div>`;
  modal(id?t('edit'):t('add_user'),body,
    `<button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
     <button class="btn btn-primary" onclick="saveUser(${id?`'${id}'`:'null'})">${t('save')}</button>`);
}
function uRoleChange(v){
  document.getElementById('u_branch_wrap').style.display=v==='super'?'none':'';
  document.getElementById('u_pages_wrap').style.display=v==='super'?'none':'';
}
function saveUser(id){
  const g=x=>document.getElementById(x).value;
  const role=g('u_role');
  const pages=role==='super'?null:Array.from(document.querySelectorAll('.u_page:checked')).map(c=>c.value);
  const rec={name:g('u_name'),username:g('u_user').trim(),password:g('u_pass'),role,
    branchId:role==='super'?null:g('u_branch'), pages:(pages&&pages.length)?pages:null};
  if(!rec.username||!rec.password){toast(t('login_err'),'err');return;}
  if(APP.users.some(x=>x.username===rec.username&&x.id!==id)){toast(t('username')+' !','err');return;}
  if(CLOUD.on){
    (async()=>{try{
      if(id){await cloudUpdateUser(id,rec);const u=APP.users.find(x=>x.id===id);if(u)Object.assign(u,rec);}
      else{await cloudAddUser(rec);APP.users.push(rec);}
      closeModal();toast(t('saved'));render();
    }catch(e){cloudErr(e);}})();
    return;
  }
  if(id)updateUser(id,rec);else addUser(rec);
  closeModal();toast(t('saved'));render();
}
function rmUser(id){if(!confirm(t('confirm_del')))return;
  if(CLOUD.on){(async()=>{try{await cloudDeleteUser(id);APP.users=APP.users.filter(x=>x.id!==id);toast(t('deleted'));render();}catch(e){cloudErr(e);}})();return;}
  deleteUser(id);toast(t('deleted'));render();}

/* ---------------- BRANCH PHOTOS ---------------- */
VIEWS.images=function(){
  const imgs=DB.images||[];
  let h=`<div class="toolbar no-print"><button class="btn btn-primary" onclick="document.getElementById('imgIn').click()">${icon('image')} ${t('upload_image')}</button>
    <input type="file" id="imgIn" accept="image/*" multiple style="display:none" onchange="handleImages(this.files)">
    <span class="pill">${icon('truck')} ${esc(branchName(APP.active.branch))}</span></div>`;
  if(!imgs.length)return h+`<div class="card"><div class="empty">${icon('image')}<div>${t('no_images')}</div></div></div>`;
  h+=`<div class="gal">${imgs.map((im,i)=>`<div class="ph"><img src="${im.data}" alt="">
    <button class="del no-print" onclick="delImage(${i})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    <div class="cap">${esc(im.name||'')} · ${fmtDate(im.date)}</div></div>`).join('')}</div>`;
  return h;
};
function handleImages(files){
  if(!files||!files.length)return;
  let done=0,tot=files.length;
  Array.from(files).forEach(file=>{
    const r=new FileReader();
    r.onload=e=>{
      const img=new Image();
      img.onload=()=>{
        // resize to max 1280px, JPEG 0.75 for storage friendliness
        const max=1280;let{width:w,height:hh}=img;
        if(w>max||hh>max){const s=max/Math.max(w,hh);w=Math.round(w*s);hh=Math.round(hh*s);}
        const c=document.createElement('canvas');c.width=w;c.height=hh;
        c.getContext('2d').drawImage(img,0,0,w,hh);
        let data;try{data=c.toDataURL('image/jpeg',0.75);}catch(err){data=e.target.result;}
        const imgObj={data,name:file.name,date:new Date().toISOString().slice(0,10)};
        DB.images.push(imgObj);
        if(CLOUD.on)cloudSaveImage(APP.active.branch,imgObj);
        if(++done===tot){try{saveDB();toast(t('saved'));}catch(err){toast(t('img_too_big'),'err');}render();}
      };
      img.src=e.target.result;
    };
    r.readAsDataURL(file);
  });
}
function delImage(i){if(!confirm(t('confirm_del')))return;const id=DB.images[i]&&DB.images[i]._id;DB.images.splice(i,1);saveDB();if(CLOUD.on)cloudDeleteImage(id);toast(t('deleted'));render();}

/* ============================================================
   BOOT — loads APP, gates behind login, starts the UI
   ============================================================ */
function dismissSplash(){
  const s=document.getElementById('splash');if(!s)return;
  s.classList.add('gone');setTimeout(()=>s.remove(),700);
}
function startApp(){
  // cloud mode: always require a fresh sign-in (no persisted session)
  if(cloudConfigured()){ cloudInit().catch(()=>{}); showLogin(); return; }
  // local mode: reuse persisted session if any
  USER=currentUser();
  if(USER){
    if(USER.role==='branch'&&USER.branchId)APP.active.branch=USER.branchId;
    syncDB();
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('app').style.display='';
    const hash=location.hash.replace('#','');const allow=allowedPages();
    ROUTE=firstAllowedRoute();
    if(hash&&VIEWS[hash]&&!(SUPER_ONLY.includes(hash)&&!isSuper())&&(!allow||allow.includes(hash)))ROUTE=hash;
    renderNav();applyChrome();render();
  } else {
    showLogin();
  }
}
function init(){
  APP=loadAPP();
  CLOUD.cfg=loadCloudCfg();
  syncDB();
  // splash content
  const sl=document.getElementById('splashLogo');if(sl)sl.innerHTML=LOGO_SVG;
  const st=document.getElementById('splashTitle');if(st)st.textContent=t('company');
  const ss=document.getElementById('splashSub');if(ss)ss.textContent=t('tagline');
  document.documentElement.setAttribute('data-theme',THEME);
  document.documentElement.dir=LANG==='ar'?'rtl':'ltr';document.body.dir=document.documentElement.dir;

  const delay=reducedMotion()?0:1400;
  setTimeout(()=>{dismissSplash();startApp();},delay);

  window.addEventListener('hashchange',()=>{
    if(!USER)return;
    const hr=location.hash.replace('#','');
    if(hr&&VIEWS[hr]&&hr!==ROUTE&&!(SUPER_ONLY.includes(hr)&&!isSuper())){ROUTE=hr;renderNav();render();}
  });
}
init();
