var newRedirects = [
  {"from": ["6020370318365"],"to": "8595074429469"},
  {"from": ["6020594187549"],"to": "8637955941661"},
  {"from": ["360018542017"],"to": "9175663648925"},
  {"from": ["6974021513885"],"to": "6792312949405"},
  {"from": ["6974013874077"],"to": "5153666348701"},
  {"from": ["7203267229853", "6974071691933", "360050971771", "360019244457", "5161970470941"], "to": "4406429578269"},
  {"from": ["6434081936541", "6486686533149"],"to": "6739198496413"},
  {"from": ["4406429596445", "6791453287325"],"to": "4527792081181"},
  {"from": ["6973977779101", "6974008266653", "4406436488093"],"to": "360051052211"},
  {"from": ["4405827152785"],"to": "4404775962641"},
  {"from": ["360050345772"],"to": "360018799217"},
  {"from": ["6093900745885"],"to": "5447414794141"},
  {"from": ["360020032171"],"to": "360019188318"},
  {"from": ["360028647472"],"to": "5193086330909"},
  {"from": ["6974071724061"],"to": "5139020740381"},
  {"from": ["7203245919261"],"to": "360050643511"},
  {"from": ["6974039494301"],"to": "6547593131933"},
  {"from": ["6974021422877"],"to": "6482770256541"},
  {"from": ["4406443636509"],"to": "4498917348381"},
  {"from": ["6974009757341"],"to": "6485710952477"},
  {"from": ["6974014993181"],"to": "6872549002269"},
  {"from": ["6974009833501"],"to": "6739198496413"},
  {"from": ["6973994970397"],"to": "6205516957213"}
];

// Do not change
for (var i = 0; i < newRedirects.length; i++) {
  var j = newRedirects[i];

  for (var k = 0; k < j['from'].length; k++) {
      if (window.location.href.indexOf(j['from'][k]) > -1) {
          window.location.href = 'https://support.exclaimer.com/hc/en-gb/articles/' + j["to"]; 
      }
  }
}

 // Redirect to new KB
 var redirectstolegacy = [
  {"from": ["360004503131"],"to": "360004503131"}
 ];

 var oldkbIds = [
  "360004503131","360004265792","360004303391","360022528131","360014021152","360028692512","360028890072","360028657252","360028654552","360028975011","360028974251","360004471831","360004328412","360004419592","360004616071","360028885272","360004382171","360020031751","360019956831","360019816172","360004356192","360004467191","4403616114833","360004466012","360029665592","360004512451","360013995872","360007142211","360016552032","360004514071","360004469392","360053310211","360019594012","360004469191","360028646772","360028967831","360028887472","360004472811","360019956371","360028966451","360018555998","360019648997","360028967091","360028963811","360028968231","360019957151","360028968311","360019957091","360028649412","360004358092","360019816472","360020032811","360027260951","360018558612","360004564032","360019816212","360020032391","360019816392","360034867092","360004415011","360004510971","360045339772","360004413172","360027343632","360020409977","360057219371","360010748232","360004464752","360004419032","360031273151","360029011811","360004328732","360004416232","360028963491","360012506451","360030006291","360028972931","360028968331","360004413792","360004516591","4404256054417","360019826198","360004614411","360025262272","360004456852","360004505271","360004678992","4421296831005","360043151912","360043396832","360043930131","360024742632","360028656272","4403988790289","4403989000977","4403989043985","360028692372","360004426651","360028963691","360028967071","360019443097","360028963791","360028646852","360004265852","360028651412","360028968491","360028967971","360028968011","4408485809041","360027497172","4411853944721","360004414471","360004462211","360028971471","360004473491","360004362192","360055860371","360044562651","360029011631","360029011771","360028972231","360004541811","360004412872","360004357312","360004467451","360004503651","360036156251","360004466612","4406744419217","360004414171","360004473071","360055750192","360004410011","360004361212","360004473771","360004418192","360013652131","360028885452","360004464232","360004383071","360028654432","360004511031","360004510811","360004411091","360020033231","360043905432","360019735272","360020030251","4415484687121","360028647812","4404469330193","4404465425297","360028963571","360028963611","360004674772","360004468772","360004508731","360045920431","360004382511","360030008271","360004467711","360027345612","360028974091","360018070317","360028970451","360055683992","360021106092","360052864052","360028967291","360004471771","360004411471","360004512591","360004513831","360007119871","360004319871","360019806532","360028966691","360004504511","360019957411","360004467871","360004512691","4410558875153","360017405952","360028963871","360004461652","360004266932","360004266912","360004565512","360004493292","360019956131","360004466792","360029587271","360004542251","360028647932","360047025472","360029434371","360004411691","360030480452","360030866291","360028964811","360028647912","360004512891","360004382731","360004541291","360020495497","360004469352","360004467091","360004356172","360004363632","360004417772","360004410351","360028966791","360028966711","360025691771","360028650992","360028966631","360028967411","360028967891","360028967331","360053590051","360028650972","360028650112","360028647252","360028650132","360028966851","4410034183313","360004307511","360004465972","360004469052","360004540491","360004466872","360030011591","360004513771","360004544291","360004516371","360004356952","4410550107537","360026121771","360018457877","360004503072","360004457192","360027302571","360004358472","360004504231","360028652372","360004328432","360024388151","360021115432","360021113732","360021888152","360028648572","360028652352","360051636112","4404837131153","360049672252","360049585192","360028964691","360028964751","4409934199441","360004265772","360004499672","360004565992","360004465372","360028652472","360004265832","360004462812","360004463712","360044101112","4413608048145","360028652392","360028969611","360028968271","360004410491","360028692792","360004489312","360019089058","360028964871","360004361512","360028967851","360028967231","360004416392","360028649732","360028654692","360019811072","360052193431","360043065731","360049128972","360004463832","360004469492","4404017068177","360029011991","360028692772","360020592678","360048630971","360004419432","360018586691","360004615971","360004472271","360004465412","4403735019153","360028969671","360048523572","360019752111","360004467151","360004513111","360042860451","360042966551","4413636801425","360018667217","360018306577","360052559452","360004491332","360018931731","360004513871","360004419492","360029011831","360004489192","360028968771","360028647192","360004469951","360022325911","360044367151","360034633312","360028652332","360028692812","360017841497","360004508271","360028969291","360028969531","360004415111","360028651932","360028651852","360028692912","360004512751","360004490172","360028647752","4408181366673","360028647592","360056132171","360028964351","360004266892","360004565432","360020761117","360004327732","360028647012","360028647152","360028963991","360029682611","360028963911","360028647672","360030482152","360028968691","360028647552","360028963851","360028647732","360042431672","360055696672","360004466531","360020022071","360034597151","360028972691","360028197392","360027545072","360004382471","360030864671","360028968891","360028651952","360017881257","360018021198","360017879037","360028692832","360028651292","360004288592","360004540611","360028492391","360023751552","360018828438","360029248252","360028651072","360028847332","360019250151","4408533653393","360004551831","360004544671","360004541431","360035241491","360004327612","4403665130641","360004275152","360025766511","360004502571","360004358372","360004465792","360015554452","360004456232","360004544711","360004413971","360004502492","360004410811","360050223652","360044400691","360004357972","360004408592","360004503851","360030533512","360019816872","360028492151","360004463932","360048668592","360004455692","360004503971","360019814832","360004502512","360051497372","360022690171","360004473291","4410079242001","360004676332","360004676712","360004463872","360045973571","360004468992","360045589391","360004319071","360018680212","360004358352","360004619731","360028963531","360004318791","360055935292","360029657332","360020218338","360056610912","360004426711","360004357572","4406732893457","360028654532","360047466091","360028655012","4408478932113","360028653852","360049123892","360044329892","360004322271","4434972491549","360027342812","360016551212","360004615051","360025598112","360028964391","360019842331","360004516291","360004412812","360029669712","360004357432","360004463252","360004328392","360004470071","360004382911","360004464812","360004411511","360028884912","360004383371","360020031011","360004617491","360004414372","360004456172","360004357692","360004356332","360028974951","360004469771","360030832552","360004468732","360023359371","360004356692","360026149092","360004456012","360028964011","360028964031","360004262672","360004419952","360004563172","360004462171","360004320351","360028974331","360004462072","360040234411","360004511231","360004358672","360004326872","360004361152","360028974111","360028656552","360028974811","360004467551","360025041171","360028966931","4410212015761","360021383332","360013774072","4407527506961","360028973691","360004357752","360028963451","360028656672","360020031351","360045541132","360004356772","360004490792","360007141531","360030533252","360004307491","360004490312","360004491012","360004492272","360026889531","360028973031","360028973991","360028975071","360004512631","360004551011","360004411131","360054697691","360004542551","360004463371","360043213032","360020030911","360004411451","360004413512","360029369852","360004265412","360019721072","360004361752","360024454972","360004381971","360019736092","360002876012","360004265892","360004491772","360004466971","360004619631","360004461632","360004413652","360004416172","360004503951","360004382631","360004412632","360028974891","360028692432","360004374711","360004455472","360004493212","360004540251","360018940052","360004410671","360004318911","360004455832","360004357932","360004412732","360028968371","360028650492","360019804492","360028968931","360028651752","360028969491","360004469012","360028651112","360019956531","360020032071","360020752037","4403603282449","360028646792","360033728771","360028651372","360019804632","360047564451","360028968151","360054496512","360028968191","360045079212","360029160551","360004616371","360052843632","360028974291","360028655772","360028653912","360004455912","360028966811","360004550971","360004544011","360004493432","360004544071","360004469512","360028657712","360004467611","360004356312","360048268711","360004493912","360044212192","360004550911","360004463992"
 ];
 var newkbIds = [
  "360004503131","360004265792","360004303391","360022528131","360014021152","360028692512","360028890072","360028657252","360028654552","360028975011","360028974251","360004471831","360004328412","360004419592","360004616071","360028885272","360004382171","360020031751","360019956831","360019816172","360004356192","360004467191","4403616114833","360004466012","360029665592","360004512451","360013995872","360007142211","360016552032","360004514071","360004469392","360053310211","360019594012","360004469191","360028646772","360028967831","360028887472","360004472811","360019956371","360028966451","360018555998","360019648997","360028967091","360028963811","360028968231","360019957151","360028968311","360019957091","360028649412","360004358092","360019816472","360020032811","360027260951","360018558612","360004564032","360019816212","360020032391","360019816392","360034867092","360004415011","360004510971","360045339772","360004413172","360027343632","360020409977","360057219371","360010748232","360004464752","360004419032","360031273151","360029011811","360004328732","360004416232","360028963491","360012506451","360030006291","360028972931","360028968331","360004413792","360004516591","4404256054417","360019826198","360004614411","360025262272","360004456852","360004505271","360004678992","4421296831005","360043151912","360043396832","360043930131","360024742632","360028656272","4403988790289","4403989000977","4403989043985","360028692372","360004426651","360028963691","360028967071","360019443097","360028963791","360028646852","360004265852","360028651412","360028968491","360028967971","360028968011","4408485809041","360027497172","4411853944721","360004414471","360004462211","360028971471","360004473491","360004362192","360055860371","360044562651","360029011631","360029011771","360028972231","360004541811","360004412872","360004357312","360004467451","360004503651","360036156251","360004466612","4406744419217","360004414171","360004473071","360055750192","360004410011","360004361212","360004473771","360004418192","360013652131","360028885452","360004464232","360004383071","360028654432","360004511031","360004510811","360004411091","360020033231","360043905432","360019735272","360020030251","4415484687121","360028647812","4404469330193","4404465425297","360028963571","360028963611","360004674772","360004468772","360004508731","360045920431","360004382511","360030008271","360004467711","360027345612","360028974091","360018070317","360028970451","360055683992","360021106092","360052864052","360028967291","360004471771","360004411471","360004512591","360004513831","360007119871","360004319871","360019806532","360028966691","360004504511","360019957411","360004467871","360004512691","4410558875153","360017405952","360028963871","360004461652","360004266932","360004266912","360004565512","360004493292","360019956131","360004466792","360029587271","360004542251","360028647932","360047025472","360029434371","360004411691","360030480452","360030866291","360028964811","360028647912","360004512891","360004382731","360004541291","360020495497","360004469352","360004467091","360004356172","360004363632","360004417772","360004410351","360028966791","360028966711","360025691771","360028650992","360028966631","360028967411","360028967891","360028967331","360053590051","360028650972","360028650112","360028647252","360028650132","360028966851","4410034183313","360004307511","360004465972","360004469052","360004540491","360004466872","360030011591","360004513771","360004544291","360004516371","360004356952","4410550107537","360026121771","360018457877","360004503072","360004457192","360027302571","360004358472","360004504231","360028652372","360004328432","360024388151","360021115432","360021113732","360021888152","360028648572","360028652352","360051636112","4404837131153","360049672252","360049585192","360028964691","360028964751","4409934199441","360004265772","360004499672","360004565992","360004465372","360028652472","360004265832","360004462812","360004463712","360044101112","4413608048145","360028652392","360028969611","360028968271","360004410491","360028692792","360004489312","360019089058","360028964871","360004361512","360028967851","360028967231","360004416392","360028649732","360028654692","360019811072","360052193431","360043065731","360049128972","360004463832","360004469492","4404017068177","360029011991","360028692772","360020592678","360048630971","360004419432","360018586691","360004615971","360004472271","360004465412","4403735019153","360028969671","360048523572","360019752111","360004467151","360004513111","360042860451","360042966551","4413636801425","360018667217","360018306577","360052559452","360004491332","360018931731","360004513871","360004419492","360029011831","360004489192","360028968771","360028647192","360004469951","360022325911","360044367151","360034633312","360028652332","360028692812","360017841497","360004508271","360028969291","360028969531","360004415111","360028651932","360028651852","360028692912","360004512751","360004490172","360028647752","4408181366673","360028647592","360056132171","360028964351","360004266892","360004565432","360020761117","360004327732","360028647012","360028647152","360028963991","360029682611","360028963911","360028647672","360030482152","360028968691","360028647552","360028963851","360028647732","360042431672","360055696672","360004466531","360020022071","360034597151","360028972691","360028197392","360027545072","360004382471","360030864671","360028968891","360028651952","360017881257","360018021198","360017879037","360028692832","360028651292","360004288592","360004540611","360028492391","360023751552","360018828438","360029248252","360028651072","360028847332","360019250151","4408533653393","360004551831","360004544671","360004541431","360035241491","360004327612","4403665130641","360004275152","360025766511","360004502571","360004358372","360004465792","360015554452","360004456232","360004544711","360004413971","360004502492","360004410811","360050223652","360044400691","360004357972","360004408592","360004503851","360030533512","360019816872","360028492151","360004463932","360048668592","360004455692","360004503971","360019814832","360004502512","360051497372","360022690171","360004473291","4410079242001","360004676332","360004676712","360004463872","360045973571","360004468992","360045589391","360004319071","360018680212","360004358352","360004619731","360028963531","360004318791","360055935292","360029657332","360020218338","360056610912","360004426711","360004357572","4406732893457","360028654532","360047466091","360028655012","4408478932113","360028653852","360049123892","360044329892","360004322271","4434972491549","360027342812","360016551212","360004615051","360025598112","360028964391","360019842331","360004516291","360004412812","360029669712","360004357432","360004463252","360004328392","360004470071","360004382911","360004464812","360004411511","360028884912","360004383371","360020031011","360004617491","360004414372","360004456172","360004357692","360004356332","360028974951","360004469771","360030832552","360004468732","360023359371","360004356692","360026149092","360004456012","360028964011","360028964031","360004262672","360004419952","360004563172","360004462171","360004320351","360028974331","360004462072","360040234411","360004511231","360004358672","360004326872","360004361152","360028974111","360028656552","360028974811","360004467551","360025041171","360028966931","4410212015761","360021383332","360013774072","4407527506961","360028973691","360004357752","360028963451","360028656672","360020031351","360045541132","360004356772","360004490792","360007141531","360030533252","360004307491","360004490312","360004491012","360004492272","360026889531","360028973031","360028973991","360028975071","360004512631","360004551011","360004411131","360054697691","360004542551","360004463371","360043213032","360020030911","360004411451","360004413512","360029369852","360004265412","360019721072","360004361752","360024454972","360004381971","360019736092","360002876012","360004265892","360004491772","360004466971","360004619631","360004461632","360004413652","360004416172","360004503951","360004382631","360004412632","360028974891","360028692432","360004374711","360004455472","360004493212","360004540251","360018940052","360004410671","360004318911","360004455832","360004357932","360004412732","360028968371","360028650492","360019804492","360028968931","360028651752","360028969491","360004469012","360028651112","360019956531","360020032071","360020752037","4403603282449","360028646792","360033728771","360028651372","360019804632","360047564451","360028968151","360054496512","360028968191","360045079212","360029160551","360004616371","360052843632","360028974291","360028655772","360028653912","360004455912","360028966811","360004550971","360004544011","360004493432","360004544071","360004469512","360028657712","360004467611","360004356312","360048268711","360004493912","360044212192","360004550911","360004463992"
 ];

 for (var i = 0; i < oldkbIds.length; i++){
   if (window.location.href.indexOf(oldkbIds[i]) > -1) {
     window.location.href = 'https://legacy.support.exclaimer.com/hc/en-gb/articles/' + newkbIds[i]; 
   }
 };

 for (var i = 0; i < redirectstolegacy.length; i++) {
  var j = redirectstolegacy[i];

  for (var k = 0; k < j['from'].length; k++) {
      if (window.location.href.indexOf(j['from'][k]) > -1) {
          window.location.href = 'https://exclaimersupport.zendesk.com/hc/en-gb/articles/' + j["to"]; 
      }
  }
};
