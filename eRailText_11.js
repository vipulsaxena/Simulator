var L = 0
var m1 = "Click here to sort on "
var m2 = "यहाँ क्लिक करें "
var m3 = " द्वारा क्रम से देखने के लिए"
var m4 = "Click here to filter "
var m5 = " on the top"
var m6 = " को चलने वाली ट्रेन क्रम से देखने के लिए"
var m7 = " श्रेणी द्वारा ट्रेन क्रम से देखने के लिए"

var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
var m_namesL = new Array("जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर")
var m_namesL2 = new Array("जन", "फ़र", "मार्च", "अप्रै", "मई", "जून", "जुला", "अग", "सित", "अक्टू", "नव", "दिस")
var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
var d_namesL = new Array("रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार")
var d_namesh = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa")
var d_nameshL = new Array("रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि")
var d_names2 = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
var d_names2L = new Array("सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार")
var d_names2S = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
var d_names2SL = new Array("सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि")
var n_Classes = new Array("", "1A", "2A", "3A", "CC", "FC", "SL", "2S", "3E", "2H")
var n_ClassesName = new Array("", "First AC", "2 Tier AC", "3 Tier AC", "Chair Car", "First Class", "Sleeper", "2nd Sitting", "3 Tier Economy", "2H")

function IRBlockMessage()
{
    var s = "<br/><center>"
    if (L == 0)
    {
        s += "<br/>To view live PNR status & seat availability you may install following browser plugins.";
        s += "<table class='DataTable2 DataTableHeader' cellpadding='0' cellspacing='1' style='text-align:center;width:90%'>";
        s += "<tr>";
        s += "<td>Browser";
        s += "<td>Download Plugin";
        s += "<td>Latest Version";
        s += "<td>How to Install";
        s += "<td>Download browser";
        s += "<td>Supported Browser Version";
        s += "<tr>";
        s += "<td>Chrome";
        s += "<td><a href='https://chrome.google.com/webstore/detail/aopfgjfeiimeioiajeknfidlljpoebgc'>Click here</a> ";
        s += "<td>2.7";
        s += "<td><a href='rail/help/ChromeHowtoInstall.pdf'>Click here</a>";
        s += "<td><a href='https://www.google.com/chrome/?hl=en&brand=chmo'>Click here</a> ";
        s += "<td>14 and above";
        s += "<tr>";
        s += "<td>Firefox ";
        s += "<td><a href='http://erail.in/extension/firefox/erail-plugin-for-firefox-2-5.xpi'>Click here</a>";
        s += "<td>2.5";
        s += "<td><a href='rail/help/FirefoxHowtoInstall.pdf'>Click here</a>";
        s += "<td><a href='http://www.mozilla.org/en-US/firefox/new/'>Click here</a>";
        s += "<td>8 and above";
        s += "</table>";
        s += "<br/>After installation refresh the web page again";

    }
    else
    {
        s += "भारतीय रेल वेबसाइट में हाल ही में परिवर्तन के कारण, उपलब्धता की जानकारी और पी.एन.आर. स्थिति प्रतिबंधित किया गया है.";
        s += "<br/>पी.एन.आर. स्थिति और सीट उपलब्धता आप ब्राउज़र प्लगिन  द्वारा पा सकते हैं";
        s += "<br/><br/>क्रोम (Chrome) - <a href='http://erail.in/extension/chrome/chrome.crx'>इन्स्टाल करने के लिए यहाँ क्लिक करें</a>";
        s += "<br/>फ़ायरफ़ॉक्स (Firefox) - <a href='http://erail.in/extension/firefox/erail-plugin-for-firefox-2-5.xpi'>इन्स्टाल करने के लिए यहाँ क्लिक करें</a>";
        s += "<br/><br/>स्थापना के बाद वेबपेज फिर से रिफ्रेश करें";
    }

    return s+"</center>";
}

function TrainSearchHelp()
{
    var s = "<br/><table cellspacing='1' cellpadding='2' style='margin:auto;' class='HelpInfo'>"
s+="<tr><td colspan='3' style='text-align:center'>" + (!L ? "How to search Trains" : "ट्रेन कैसे खोजें")
s+="<tr><td>1<td>" + (!L ? "Choose Station - To search by station Name<td>step 1" : "स्टेशन चुनें- स्टेशन के नाम के द्वारा खोज करने के लिए<td>चरण 1")
s+="<tr><td>2<td>" + (!L ? "Choose Train- To search by Train Name or Train Number<td>step 8" : "ट्रेन चुनें - ट्रेन नाम या ट्रेन संख्या के द्वारा खोज करने के लिए<td>चरण 8")
s+="<tr><td>3<td>" + (!L ? "Type From and To station in the box<td>step 2" : "से और तक स्टेशन बॉक्स में टाइप करें<td>चरण 2")
s+="<tr><td>4<td>" + (!L ? "Click on \"Show Trains\" to get the train list between given stations<td>step 3" : "स्टेशन के बीच ट्रेन देखने के लिए \"ट्रेन खोजें\" पर क्लिक करें<td>चरण 3")
s+="<tr><td>5<td>" + (!L ? "Click on \"Return trains\" to get the Train list of Return Journey<td>step 3" : "वापसी की ट्रेन देखने के लिए \"वापसी ट्रेन\" पर क्लिक करें<td>चरण 3")
s+="<tr><td>6<td>" + (!L ? "Choose date of Journey for seat Availability<td>step 4" : "यात्रा की सीट उपलब्धता के लिए तिथि चुनें<td>चरण 4")
s+="<tr><td>7<td>" + (!L ? "Choose quota for seat Availability<td>step 5" : "सीट उपलब्धता के लिए कोटा चुनें<td>चरण 5")
s+="<tr><td colspan='3'>" + T[62][L]
s+="</table>"
return s;
}

function HelpInfo(M)
{
M = M == undefined ? M = "" : "<br/>" + M;
var t = "<tr><td>";
var s = "<table class='HelpInfo' style='margin:auto;' cellspacing='1px' cellpadding='2px'><caption>" + M + "</caption<tr><th>" + (!L ? "Click On" : "क्लिक करें") + "<th>" + (!L ? "For" : "के लिए")
s+=t + (!L ? "Train Number<td>Fare & Route" : "गाड़ी संख्या<td>किराया और मार्ग")
//s+=t + (!L ? "Dep. Time<td>Running Status at Source Station - select date at step 3" : "प्रस्थान समय<td>स्रोत स्टेशन पर स्थिति रनिंग  - चरण 3 पर दिनांक का चयन करें")
//s+=t + (!L ? "Arr. Time<td>Running Status at Destination Station - select date at step 3" : "आगमन समय<td>गंतव्य स्टेशन पर स्थिति रनिंग - चरण 3 पर दिनांक का चयन करें")
s += t + (!L ? "Travel Time<td>To get route in map & roll mouse over to view Avg speed and Distance Km" : "यात्रा समय<td>नक्शे पर मार्ग")
s+=t + (!L ? "R<td>View run days of the train on calendar" : "R<td>कैलेंडर पर ट्रेन के चलने के दिन देखें ")
s += t + (!L ? "Av<td>Availability of selected class - select date of travel at step 3 & Roll Mouse over to view GN and Tatkal Fare" : "Av<td>चयनित वर्ग की उपलब्धता - चरण 3 पर यात्रा की तारीख का चयन करें")
s+=t + (!L ? "Header<td>Sorting" : "हैडर<td>क्रम से देखने के लिए")
//s+=t + (!L ? "<a class='AdminNote'>&nbsp;i&nbsp;</a><td>Special Note" : "<a class='AdminNote'>&nbsp;i&nbsp;</a><td>विशेष नोट")
s+="<tr><td colspan='2'>" + (!L ? "<b>Roll mouse over any text / Data  to get help and many more features</b>" : "किसी भी शब्द / डाटा पर माउस ले जाएँ  अधिक मदद और सुविधाओं की जानकारी के लिए")
s+="</table>"
return s
}

var T = [
["<b>Main Stations</b>", "<b>मुख्य स्टेशन</b>"], //0
["Main Stations", "मुख्य स्टेशन"], //1
["<b>All Stations</b>", "<b>सभी स्टेशन</b>"], //2
["All Stations", "सभी स्टेशन"], //3
["Train", "ट्रेन"], //4
["Train Name", "ट्रेन का नाम"], //5
["From", "से"], //6
["To", "तक"], //7
["Dep.", "प्रस्थान"], //8
["Arr.", "आगमन"], //9
["Travel", "यात्रा"], //10
[m1 + "Train Number", m2 + "ट्रेन नंबर" + m3], //11
[m1 + "Train Name", m2 + "ट्रेन नाम" + m3], //12
["Pantry", "पैंट्री"], //13
[m1 + "From Station", m2 + "से स्टेशन" + m3], //14
[m1 + "Departure time at the From station", m2 + "प्रस्थान समय" + m3], //15
[m1 + "To Station", m2 + "तक स्टेशन" + m3], //16
[m1 + "Arrival Time at the To Station", m2 + "आगमन समय" + m3], //17
[m1 + "Travel Time of the train", m2 + "पूरी यात्रा के समय" + m3], //18
[m1 + "daily trains" + m5, m2 + "सभी दिन चलने ट्रेन" + m3], //19
[m1 + "Monday" + m5, m2 + "सोमवार" + m6], //20
[m1 + "Tuesday" + m5, m2 + "मंगलवार" + m6], //21
[m1 + "Wednesday" + m5, m2 + "बुधवार" + m6], //22
[m1 + "Thursday" + m5, m2 + "बृहस्पतिवार" + m6], //23
[m1 + "Friday" + m5, m2 + "शुक्रवार" + m6], //24
[m1 + "Saturday" + m5, m2 + "शनिवार" + m6], //25
[m1 + "Sunday" + m5, m2 + "रविवार" + m6], //26
[m1 + "AC 1-tier sleeper" + m5, m2 + "प्रथम वातानुकूलित" + m7], //27
[m1 + "AC 2-tier sleeper" + m5, m2 + "द्वितीय वातानुकूलित" + m7], //28
[m1 + "AC 3-tier sleeper" + m5, m2 + "तृतीय वातानुकूलित" + m7], //29
[m1 + "AC Chair Car" + m5, m2 + "वातानुकूलित कुर्सीयान" + m7], //30
[m1 + "First Class" + m5, m2 + "प्रथम श्रेणी" + m7], //31
[m1 + "Sleeper Class" + m5, m2 + "शयनयान" + m7], //32
[m1 + "Second Sitting" + m5, m2 + "द्वितीय श्रेणी" + m7], //33
[m1 + "3 AC Economy" + m5, m2 + "तृतीय वातानुकूलित इकोनोमी" + m7], //34
['SNo', "क्रम"], //35
['Serial Number', "क्रम"], //36
['Code', "कोड"], //37
['Stn Name', "स्टेशन नाम"], //38
['Arr.', "आगमन"], //39
['Dep.', "प्रस्थान"], //40
['Halt', "हाल्ट"], //41
['PF', "पीएफ"], //42
['Dist.', "दूरी"], //43
['Day', "दिन"], //44
['Remark', "टिप्पणी"], //45
['Station Code', "स्टेशन कोड"], //46
['Station Name', "स्टेशन नाम"], //47
['Arrival Time', "आगमन समय"], //48
['Departure Time', "प्रस्थान समय"], //49
['Halt Time ( in minutes )', "हाल्ट समय (मिनट में)"], //50
["title3='Select Return date for availability'", "title3='सीट उपलब्धता जांच करने के लिए, वापसी की तारीख का चयन करने के लिए यहाँ क्लिक करें'"], //51
["Please Wait, getting trains list ...", "कृपया प्रतीक्षा करें, गाड़ियों की सूची आ रही है..."], //52
["Running status of ", "रनिंग स्थिति "], //53
["Click to view availability of ", "सीट उपलब्धता देखने के लिए यहाँ क्लिक करें "], //54
["Advanced Filters", "एडवांस फ़िल्टर"], //55
["Print trains list", "ट्रेनों की सूची प्रिंट"], //56
["Direct Link", "डायरेक्ट लिंक"], //57
["Click here to print the search list", "खोज सूची को प्रिंट करने के लिए यहाँ क्लिक करें"], //58
[" travel agents", " ट्रैवल एजेंट"], //59
[" travel agents details coming soon", " ट्रैवल एजेंटों के विवरण जल्द ही आ रहे हैं"], //60
["<center>If you are a travel agent ", "<center>अगर आप एक ट्रैवल एजेंट हैं "], //61
["For better experience, View in Full Window Mode. Press <span style='color: #FF0000'>F11</span> Key. To return, press F11 again.", "बेहतर अनुभव के लिए, पूर्ण विंडो मोड में देखने के लिए<span style='color: #FF0000'> F11 </span> दबाएँ लौटने के लिए, F11 फिर से दबाएँ"], //62
["Fare is an indicative amount, click on the amount link to get an exact fare", "किराया सांकेतिक राशि है, सटीक किराया देखने के लिए  राशि लिंक पर क्लिक करें"], //63
["Click here to view trains between ", ""], //64
["", " के बीच ट्रेन देखने के लिए यहाँ क्लिक करें"], //65
[" and ", " से "], //66
["title3='Select Departure date for availability'", "title3='सीट उपलब्धता जांच करने के लिए, प्रस्थान की तारीख का चयन करने के लिए यहाँ क्लिक करें'"], //67
[" ( Train Ends At This Station )", " ( यह ट्रेन का आखरी स्टेशन है )"], //68
[" (First Station)", " (पहेला स्टेशन)"], //69
["Click on train number to View fare and schedule", "ट्रेन संख्या पर क्लिक करें किराया और समय देखने"], //70
[" days", " दिन"], //71
["Distance - ", "दूरी -"], //72
[" kms, Average Speed - ", " कि.मी., औसत गति -"], //73 
[" km/hr, Click here to view train on map", " कि.मी. प्रति घंटे, नक्शे पर ट्रेन देखने के लिए क्लिक करें"], //74
["Train runs from ", "ट्रेन चलती है "], //75
[" on ", " से "], //76
["search  ", "खोजें  "], //77
["  trains", "  ट्रेन"], //78
["Select tatkal stations combination, if above Quota selection is Tatkal", "अगर ऊपर कोटा चयन तत्काल है तब यहाँ से तत्काल स्टेशनों संयोजन चयन करें"], //79
[" Adult", " वयस्क"], //80
[" Child", " बच्चे"], //81
[" Senior Male", " वरिष्ठ पुरुष"], //82
[" Senior Female", " वरिष्ठ महिला"], //83
["No direct trains found, Please use a transit station for your search", "कोई सीधी ट्रेन नहीं है, अपनी खोज के लिए ट्रांजिट स्टेशन का प्रयोग करें"], //84
["View one of shortest route", "सबसे छोटा मार्ग देखने के लिए यहाँ क्लिक करें"], //85
["Suggestion Shown On The Right Side - Search History", "खोज इतिहास में एक सुझाव सही पक्ष पर दिखाया गया है"], //86
["5 to 11 years", "5-11 साल"], //87
["Male 60 years and Above", "60 साल या अधिक के पुरुष"], //88
["Female 58 years and Above", "58 साल या अधिक की महिला"], //89
["General Fare", "सामान्य किराया"], //90
["View Running Days", "कैलेंडर में ट्रेन के चलने के दिन देखें"], //91
[" - View arrival & departure of trains", " - गाड़ियों के आगमन व प्रस्थान देखें"], //92
[" to ", " से "], //93
["Highlighted days show run days of the selected train", "विशेष रंग से दिखाए गए दिन पर गाड़ी चलती है"], //94
["Close Calendar", "कैलेंडर बंद"], //95
["Advance Reservation Period=", "अग्रिम आरक्षण="], //96
["Click here for Trade Enquiry", "व्यापार संबंधी पूछताछ के लिए यहां क्लिक करें"], //97
["<a href='http://hindi.erail.in' title3='हिंदी में वेबसाइट को देखने के लिए यहाँ क्लिक करें'>हिन्दी</a>", "<a href='http://erail.in' title3='अंग्रेजी में वेबसाइट को देखने के लिए यहाँ क्लिक करें'>English</a>"], //98
["Tatkal Fare", "ततकाल किराया"], //99
["Departure Day", "प्रस्थान दिन"], //100
["Arrival Day", "आगमन दिन"], //101
["Class", "श्रेणी"], //102
["Zone", "ज़ोन"], //103
["Div.", "डिवीजन"], //104
["Departure Station", "प्रस्थान स्टेशन"], //105
["Arrival Station", "आगमन  स्टेशन"], //106
["Type", "प्रकार"], //107
["Show Trains", "ट्रेन खोजें"], //108
["Return Trains", "वापसी ट्रेन"], //109
["Use this link to send to your friends for direct search of trains", "गाड़ियों को सीधे खोजने के लिए अपने दोस्तों को इस लिंक को भेजें"], //110
["Clear Filters", "सब फ़िल्टर हटायें"], //111
["Please enter 10 digit PNR number", "कृपया 10 अंक पीएनआर संख्या दर्ज करें"], //112
["Print", "प्रिंट"], //113
["After Search of train", "ट्रेन खोज के बाद"], //114
[" from ", "  "], //115
[" on ", "  "], //116
["Click here to get current status of PNR", "पी.एन.आर. की वर्तमान स्थिति को पाने के लिए यहाँ क्लिक करें"], //117
["Get PNR Status", "पी.एन.आर. स्थिति"], //118
["Type PNR No", "पी.एन.आर. भरें"], //119
["Show Train Detail", "ट्रेन दिखाएँ"], //120
["Click to get the Full Train Route", "ट्रेन का पूर्ण मार्ग के लिए पर क्लिक करें"], //121
["Train not found", "ट्रेन नहीं मिली"], //122
["For All type of Concessions Fare<br/>&nbsp;Click on Train Number and then <br/>&nbsp;Click on Fare of Class", "सभी प्रकार के रियायती किराये के लिए<br/>&nbsp;गाड़ी संख्या पर क्लिक करें और<br/>&nbsp;तब क्लास के किराये पर क्लिक करें"], //123
["", "द्वारा स्टेशन का कोड या नाम टाइप करें"], //124
["Via Station", "वाया स्टेशन"], //125
["Please select a Via station", "कृपया वाया स्टेशन का चयन करें"], //126
["From and Via Station cannot be same", "प्रस्थान और वाया स्टेशन एक जैसे नहीं हो सकते हैं"], //127
["Via and To Station cannot be same", "वाया और आगमन स्टेशन एक जैसे नहीं हो सकते हैं"], //128
["From and To Station cannot be same", "प्रस्थान और आगमन स्टेशन एक जैसे नहीं हो सकते हैं"], //129
["To view wait time of next train, click on any train number<br/>Wait time calculated based on date selected at Step 4<br/>After changing the date click on train number again",
 "अगली ट्रेन का प्रतीक्षा समय देखने के लिए ट्रेन संख्या पर क्लिक करें<br/>प्रतीक्षा समय चरण 4 में चयनित तिथि पर आधारित है<br/>तारीख बदलने के बाद ट्रेन संख्या पर फिर से क्लिक करें"], //130
["Click here to apply advance filters to the search list", "खोज सूची पर अडवांस फ़िल्टर लगाने के लिए यहाँ क्लिक करें"], //131
["Wait", "प्रतीक्षा"], //132 
["Click on a Via station to view trains", "ट्रेन देखने के लिए वाया स्टेशन पर क्लिक करें"], //133
["Total", "कुल"], //134
["Total Journey Time", "कुल यात्रा का समय"], //135
["Select any train in the above list and then<br/>move mouse over wait time to view in detail", "उपरोक्त सूची में किसी भी गाड़ी का चयन करें और फिर<br/>विस्तार में देखने के प्रतीक्षा समय पर माउस ले जाएँ"], //136
["Please select a train from the list to check the running status.", "कृपया सूची में से एक ट्रेन का चयन करें, वर्तमान स्थिति की जाँच करने के लिए"], //137
["Click here to view tatkal opening date", "तत्काल बुकिंग खुलने की तारीख देखने के लिए यहाँ क्लिक करें"], //138
["Click here to view train list", "ट्रेन सूची देखने के लिए यहाँ क्लिक करें"], //139
["Tatkal Dates", "तत्काल तारीख"], //140
["Train List", "ट्रेन सूची"], //141
["Platform", "प्लैटफ़ार्म"], //142
[", Click to change station", ", क्लिक करें - स्टेशन बदलें"], //143
["", ""], //144
["", ""], //145
["", ""], //146


["",""]
];


