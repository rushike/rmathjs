
// Miller Rabin determistic k bases 
// This bases are potential witnesses for Miller Rabin Primality testing n < 3,317,044,064,679,887,385,961,981
export const MILLER_RABIN_K_BASES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]

// Primes less than 100
export const PRIMES_LESS_THAN_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

export const POW_10 = [
  1,               10,
  100,             1000,
  10000,           100000,
  1000000,         10000000,
  100000000,       1000000000,
  10000000000,     100000000000,
  1000000000000,   10000000000000,
  100000000000000, 1000000000000000
]

export const E  = "2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354021234078498193343210681701210056278802351930332247450158539047304199577770935036604169973297250886876966403555707162268447162560798826517871341951246652010305921236677194325278675398558944896970964097545918569563802363701621120477427228364896134225164450781824423529486363721417402388934412479635743702637552944483379980161254922785092577825620926226483262779333865664816277251640191059004916449982893150566047258027786318641551956532442586982946959308019152987211725563475463964479101459040905862984967912874068705048958586717479854667757573205681288459205413340539220001137863009455606881667400169842055804033637953764520304024322566135278369511778838638744396625322498506549958862342818997077332761717839280349465014345588970719425863987727547109629537415211151368350627526023264847287039207643100595841166120545297030236472549296669381151373227536450988890313602057248176585118063036442812314965507047510254465011727211555194866850800368532281831521960037356252794495158284188294787610852639813955990067376482922443752871846245780361929819713991475644882626039033814418232625150974827987779964373089970388867782271383605772978824125611907176639465070633045279546618550966661856647097113444740160704626215680717481877844371436988218559670959102596862002353718588748569652200050311734392073211390803293634479727355955277349071783793421637012050054513263835440001863239914907054797780566978533580489669062951194324730995876552368128590413832411607226029983305353708761389396391779574540161372236187893652605381558415871869255386061647798340254351284396129460352913325942794904337299085731580290958631382683291477116396337092400316894586360606458459251269946557248391865642097526850823075442545993769170419777800853627309417101634349076964237222943523661255725088147792231519747780605696725380171807763603462459278778465850656050780844211529697521890874019660906651803516501792504619501366585436632712549639908549144200014574760819302212066024330096412704894390397177195180699086998606636583232278709376502260149291011517177635944602023249300280401867723910288097866605651183260043688508817157238669842242201024950551881694803221002515426494639812873677658927688163598312477886520141174110913601164995076629077943646005851941998560162647907615321038727557126992518275687989302761761146162549356495903798045838182323368612016243736569846703785853305275833337939907521660692380533698879565137285593883499894707416181550125397064648171946708348197214488898790676503795903669672494992545279033729636162658976039498576741397359441023744329709355477982629614591442936451428617158587339746791897571211956187385783644758448423555581050025611492391518893099463428413936080383091662818811503715284967059741625628236092168075150177725387402564253470879089137291722828611515915683725241630772254406337875931059826760944203261924285317018781772960235413060672136046000389661093647095141417185777014180606443636815464440053316087783143174440811949422975599314011888683314832802706553833004693290115744147563139997221703804617092894579096271662260740718749975359212756084414737823303270330168237193648002173285734935947564334129943024850235732214597843282641421684878721673367010615094243456984401873312810107945127223737886126058165668053714396127888732527373890392890506865324138062796025930387727697783792868409325365880733988457218746021005311483351323850047827169376218004904795597959290591655470505777514308175112698985188408718564026035305583737832422924185625644255022672155980274012617971928047139600689163828665277009752767069777036439260224372841840883251848770472638440379530166905465937461619323840363893131364327137688841026811219891275223056256756254701725086349765367288605966752740868627407912856576996313789753034660616669804218267724560530660773899624218340859882071864682623215080288286359746839654358856685503773131296587975810501214916207656769950659715344763470320853215603674828608378656803073062657633469774295634643716709397193060876963495328846833613038829431040800296873869117066666146800015121143442256023874474325250769387077775193299942137277211258843608715834835626961661980572526612206797540621062080649882918454395301529982092503005498257043390553570168653120526495614857249257386206917403695213533732531666345466588597286659451136441370331393672118569553952108458407244323835586063106806964924851232632699514603596037297253198368423363904632136710116192821711150282801604488058802382031981493096369596735832742024988245684941273860566491352526706046234450549227581151709314921879592718001940968866986837037302200475314338181092708030017205935530520700706072233999463990571311587099635777359027196285061146514837526209565346713290025994397663114545902685898979115837093419370441155121920117164880566945938131183843765620627846310490346293950029458341164824114969758326011800731699437393506966295712410273239138741754923071862454543222039552735295240245903805744502892246886285336542213815722131163288112052146489805180092024719391710555390113943316681515828843687606961102505171007392762385553386272553538830960671644662370922646809671254061869502143176211668140097595281493907222601112681153108387317617323235263605838173151034595736538223534992935822836851007810884634349983518404451704270189381994243410090575376257767571118090088164183319201962623416288166521374717325477727783488774366518828752156685719506371936565390389449366421764003121527870222366463635755503565576948886549500270853923617105502131147413744106134445544192101336172996285694899193369184729478580729156088510396781959429833186480756083679551496636448965592948187851784038773326247051945050419847742014183947731202815886845707290544057510601285258056594703046836344592652552137008068752009593453607316226118728173928074623094685367823106097921599360019946237993434210687813497346959246469752506246958616909178573976595199392993995567542714654910456860702099012606818704984178079173924071945996323060254707901774527513186809982284730860766536866855516467702911336827563107223346726113705490795365834538637196235856312618387156774118738527722922594743373785695538456246801013905727871016512966636764451872465653730402443684140814488732957847348490003019477888020460324660842875351848364959195082888323206522128104190448047247949291342284951970022601310430062410717971502793433263407995960531446053230488528972917659876016667811937932372453857209607582277178483361613582612896226118129455927462767137794487586753657544861407611931125958512655759734573015333642630767985443385761715333462325270572005303988289499034259566232975782488735029259166825894456894655992658454762694528780516501720674785417887982276806536650641910973434528878338621726156269582654478205672987756426325321594294418039943217000090542650763095588465895171709147607437136893319469090981904501290307099566226620303182649365733698419555776963787624918852865686607600566025605445711337286840205574416030837052312242587223438854123179481388550075689381124935386318635287083799845692619981794523364087429591180747453419551420351726184200845509170845682368200897739455842679214273477560879644279202708312150156406341341617166448069815483764491573900121217041547872591998943825364950514771379399147205219529079396137621107238494290616358"

export const PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275900994657640789512694683983525957098258226205224894077267194782684826014769909026401363944374553050682034962524517493996514314298091906592509372216964615157098583874105978859597729754989301617539284681382686838689427741559918559252459539594310499725246808459872736446958486538367362226260991246080512438843904512441365497627807977156914359977001296160894416948685558484063534220722258284886481584560285060168427394522674676788952521385225499546667278239864565961163548862305774564980355936345681743241125150760694794510965960940252288797108931456691368672287489405601015033086179286809208747609178249385890097149096759852613655497818931297848216829989487226588048575640142704775551323796414515237462343645428584447952658678210511413547357395231134271661021359695362314429524849371871101457654035902799344037420073105785390621983874478084784896833214457138687519435064302184531910484810053706146806749192781911979399520614196634287544406437451237181921799983910159195618146751426912397489409071864942319615679452080951465502252316038819301420937621378559566389377870830390697920773467221825625996615014215030680384477345492026054146659252014974428507325186660021324340881907104863317346496514539057962685610055081066587969981635747363840525714591028970641401109712062804390397595156771577004203378699360072305587631763594218731251471205329281918261861258673215791984148488291644706095752706957220917567116722910981690915280173506712748583222871835209353965725121083579151369882091444210067510334671103141267111369908658516398315019701651511685171437657618351556508849099898599823873455283316355076479185358932261854896321329330898570642046752590709154814165498594616371802709819943099244889575712828905923233260972997120844335732654893823911932597463667305836041428138830320382490375898524374417029132765618093773444030707469211201913020330380197621101100449293215160842444859637669838952286847831235526582131449576857262433441893039686426243410773226978028073189154411010446823252716201052652272111660396665573092547110557853763466820653109896526918620564769312570586356620185581007293606598764861179104533488503461136576867532494416680396265797877185560845529654126654085306143444318586769751456614068007002378776591344017127494704205622305389945613140711270004078547332699390814546646458807972708266830634328587856983052358089330657574067954571637752542021149557615814002501262285941302164715509792592309907965473761255176567513575178296664547791745011299614890304639947132962107340437518957359614589019389713111790429782856475032031986915140287080859904801094121472213179476477726224142548545403321571853061422881375850430633217518297986622371721591607716692547487389866549494501146540628433663937900397692656721463853067360965712091807638327166416274888800786925602902284721040317211860820419000422966171196377921337575114959501566049631862947265473642523081770367515906735023507283540567040386743513622224771589150495309844489333096340878076932599397805419341447377441842631298608099888687413260472156951623965864573021631598193195167353812974167729478672422924654366800980676928238280689964004824354037014163149658979409243237896907069779422362508221688957383798623001593776471651228935786015881617557829735233446042815126272037343146531977774160319906655418763979293344195215413418994854447345673831624993419131814809277771038638773431772075456545322077709212019051660962804909263601975988281613323166636528619326686336062735676303544776280350450777235547105859548702790814356240145171806246436267945612753181340783303362542327839449753824372058353114771199260638133467768796959703098339130771098704085913374641442822772634659470474587847787201927715280731767907707157213444730605700733492436931138350493163128404251219256517980694113528013147013047816437885185290928545201165839341965621349143415956258658655705526904965209858033850722426482939728584783163057777560688876446248246857926039535277348030480290058760758251047470916439613626760449256274204208320856611906254543372131535958450687724602901618766795240616342522577195429162991930645537799140373404328752628889639958794757291746426357455254079091451357111369410911939325191076020825202618798531887705842972591677813149699009019211697173727847684726860849003377024242916513005005168323364350389517029893922334517220138128069650117844087451960121228599371623130171144484640903890644954440061986907548516026327505298349187407866808818338510228334508504860825039302133219715518430635455007668282949304137765527939751754613953984683393638304746119966538581538420568533862186725233402830871123282789212507712629463229563989898935821167456270102183564622013496715188190973038119800497340723961036854066431939509790190699639552453005450580685501956730229219139339185680344903982059551002263535361920419947455385938102343955449597783779023742161727111723643435439478221818528624085140066604433258885698670543154706965747458550332323342107301545940516553790686627333799585115625784322988273723198987571415957811196358330059408730681216028764962867446047746491599505497374256269010490377819868359381465741268049256487985561453723478673303904688383436346553794986419270563872931748723320837601123029911367938627089438799362016295154133714248928307220126901475466847653576164773794675200490757155527819653621323926406160136358155907422020203187277605277219005561484255518792530343513984425322341576233610642506390497500865627109535919465897514131034822769306247435363256916078154781811528436679570611086153315044521274739245449454236828860613408414863776700961207151249140430272538607648236341433462351897576645216413767969031495019108575984423919862916421939949072362346468441173940326591840443780513338945257423995082965912285085558215725031071257012668302402929525220118726767562204154205161841634847565169998116141010029960783869092916030288400269104140792886215078424516709087000699282120660418371806535567252532567532861291042487761825829765157959847035622262934860034158722980534989650226291748788202734209222245339856264766914905562842503912757710284027998066365825488926488025456610172967026640765590429099456815065265305371829412703369313785178609040708667114965583434347693385781711386455873678123014587687126603489139095620099394"