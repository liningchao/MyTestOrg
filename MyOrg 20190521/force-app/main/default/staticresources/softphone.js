<script type="text/javascript">
function StartTone()
{
    
    bsound.src = mfile.src;
}

function StopTone()
{
    bsound.src = "";
}
function isNumber(s){ 

var regu = "^[0-9]+$"; 
var re = new RegExp(regu); 
if (s.search(re) != -1){ return true;} else { return false;} 
} 
</script>
<script>

var VaxSIPUserAgentCAB;
var m_bIsInternetExplorerBrowser = false;

function IsMozillaPluginInstall()
{
    
    var bPlugIn = false;
    
    if(navigator.plugins)
    {

        for (nCount = 0; nCount < navigator.plugins.length; nCount++)
        {

            if(navigator.plugins[nCount].name.indexOf('VaxSIPUserAgent 7.0.6.4') >= 0)
            {
                bPlugIn = true;
                break;
            }
        }
    }

    return bPlugIn;
}


function IsWindowActiveXInstall()
{
    
    var bActiveX = false;
        
    if(window.ActiveXObject)
    {
        if(document.VaxEmbedCAB)
        {
            bActiveX = true;
        }
    } 
    

    return bActiveX;
}


function downLoadMozillaPlugin(){
    document.getElementById("showError").innerHTML="<a href='npVaxSIPUserAgent.msi'><b><font color=red>下载插件</font></b></a>";
        
}


</script>
    
    
    
    
    
    
    <!-- Phone Js -->
     <script language="javascript">


function OffLine()
{
  
    StopTone();
    UnInitialize();
    setBtnDisabled("callBtn",true);
    setBtnDisabled("acceptBtn",true);
    setBtnDisabled("rejectBtn",true);
    
    setBtnDisabled("hangUpBtn",true);
    setBtnDisabled("transferBtn",true);
    setBtnDisabled("consultBtn",true);
    setBtnDisabled("meetBtn",true);
    setBtnDisabled("holdBtn",true);
    setBtnDisabled("unholdBtn",true);
    setBtnDisabled("onLineBtn",false);
    
    document.getElementById("showError").innerHTML = "下线成功";
    document.getElementById("consultBtn").value="磋商";
    document.getElementById("meetBtn").value="三方会议";
}

function Online()
{
	alert('Online');
    DetectWebBrowser();
        
    //SetDomainKey("186D94D194D122D89D218D66D230D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D195D68D214D112D84D199D241D105D163D25D115D147D98D114D222D125D");
    SetDomainKey("183D171D5D11D22D119D183D142D155D143D144D148D174D62D156D117D213D41D132D149D22D213D171D3D183D181D115D13D209D10D207D243D26D117D228D122D41D41D181D54D124D118D10D127D247D90D74D40D144D219D129D201D70D233D165D27D83D176D80D211D54D0D108D141D245D47D231D99D135D181D121D150D137D130D113D173D25D33D63D238D230D40D158D216D92D73D225D68D135D239D109D81D137D211D253D223D188D130D157D189D186D217D126D245D207D74D96D224D232D122D30D144D29D236D31D100D97D249D204D87D142D3D220D188D22D159D168D197D235D7D38D98D76D252D57D83D40D115D38D184D204D58D48D15D");
    MyIP = GetMyIP();
    AccountUserName = EditLoginId;
    AccountAuthLogin = EditLoginId;
    AccountAuthPassword = EditLoginPwd;
    AccountDisplayName = EditLoginId;
    AccountDomain = EditSIPProxy;
    AccountSIPProxy = EditSIPProxy;
    m_nTotalLine = 7;
    for(ListenPortSIP = 5061; ListenPortSIP < 7000; ListenPortSIP++)
    {
        Result = InitializeEx(0, MyIP, ListenPortSIP,AccountUserName, AccountAuthLogin, AccountAuthPassword, AccountDisplayName, AccountDomain, AccountSIPProxy, '', 1, m_nTotalLine);
        if(!Result)
        {
            if(GetVaxObjectError() != 11)
            {
                ErrorMessage();
                break;
            }
        }
        else
        {
            break;
        }
    }

    if(ListenPortSIP >= 7000)
    {
        alert("Cann't open SIP communication port.");
        return;
    }
    
            
    if(!OpenLinesVaxVoIP(MyIP)) return;
        
    if(!RegisterToProxy(1800))
        {
            ErrorMessage();
            return;
        }

    
    
    //禁用噪声清除
    DisableEchoNoiseCancellation();
    //禁用自动增溢
    DisableAGC();
    //禁用麦克风增强
    DisableMicBoost();
    
    EnableEchoNoiseCancellation();
    //清除所有语音编码  
    DeselectAllVoiceCodec();
    
     /**** Codec No 3 represents G711U *****/
    SelectVoiceCodec(3);
    /**** Codec No 2 represents G711A *****/
    SelectVoiceCodec(2);
     /**** Codec No 0 represents GSM610 *****/
    SelectVoiceCodec(0);
     /**** Codec No 1 represents iLBC *****/
    SelectVoiceCodec(1);
    
                    
    EnableKeepAlive(10);
    
}

function OpenLinesVaxVoIP(MyIP)
{
    
    ListenPortRTP = 7000;
    ErrorCount = 0;
                
    for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
    {
        
            
        if(!OpenLine(LineNo, 0, MyIP, ListenPortRTP))
        {
            
            if(GetVaxObjectError() == 11)
            {
                ErrorCount++;
                LineNo--;
            }
            else
            {
                ErrorMessage();
                Result = false;
                break;
            }
        }
    
        ListenPortRTP += 2;  // It is importent to increament RTP Listen Port by 2

        if(ErrorCount >= (m_nTotalLine + 500)) // If unable to open more than 500 ports.
        {   
            alert("Unable to open RTP communication port.");
            return false;
        }
    }

    return true;
}



//呼出
function BtnDial_onclick222() 
{
    if(EditPhoneNo.value == "")
    {
        alert("Please enter a phone number.");
        return;
    }
    busyLineNo = FindLine();
    LineNo = busyLineNo;
        
            
    InputDeviceId  = 0;
    OutputDeviceId = 0;
            
    if(!DialCall(LineNo, EditPhoneNo.value, InputDeviceId, OutputDeviceId))
    {
        ErrorMessage();
    }
    else
    {
        
    }
    setBtnDisabled("hangUpBtn",false);
    callType = "out";
    hangupflag = false;
    
}

function showDialPad(){
  window.showModalDialog("dialPad.html?nowdate="+new Date(),window,"status:no;scroll:no;location:no;dialogLeft:180;dialogTop:260;dialogWidth:80px;dialogHeight:260px");
}
function FindLine()
{
    
    for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
    {
        
        if(!IsLineBusy(LineNo)) return LineNo;
        
    }

    return -1;
}



function BtnAccept_onclick33() 
{
   
    
   
}

function BtnReject_onclick() 
{
 
  
      CallId = aCallId
          
      if(!RejectCall(CallId))
      {
        ErrorMessage();
        return;
      }
      
      StopTone();
      setBtnDisabled("callBtn",false);
      setBtnDisabled("acceptBtn",true);
      setBtnDisabled("rejectBtn",true);
 
}




function BtnTransferCall_onclick22() 
{
    /*Scottzhushi*/
    var callno = window.showModalDialog("dialPad.html?nowdate="+new Date(),window,"status:no;scroll:no;location:no;dialogWidth:300px;dialogHeight:300px");
    
    if(callno==""||callno==null){
        alert("转接号码不能空");
        return;
    }else{
        if(!isNumber(callno)){
            alert("转接号码应为数字");
            return;
        }
    }
    if(!TransferCallEx(busyLineNo, callno))
    {
        ErrorMessage();
    }
}


function BtnDialPad1_onclick() 
{
    EditPhoneNo.value += "1";
    
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "1"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "1"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "1"); 
    }
}

function BtnDialPad2_onclick() 
{
    EditPhoneNo.value += "2";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "2"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "2"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "2"); 
    }
}

function BtnDialPad3_onclick() 
{
    EditPhoneNo.value += "3";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "3"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "3"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "3"); 
    }
}

function BtnDialPad4_onclick() 
{
    EditPhoneNo.value += "4";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "4"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "4"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "4"); 
    }
}

function BtnDialPad5_onclick() 
{
    EditPhoneNo.value += "5";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "5"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "5"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "5"); 
    }
}

function BtnDialPad6_onclick() 
{
    EditPhoneNo.value += "6";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "6"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "6"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "6"); 
    }
}

function BtnDialPad7_onclick() 
{
    EditPhoneNo.value += "7";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "7"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "7"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "7"); 
    }
}

function BtnDialPad8_onclick() 
{
    EditPhoneNo.value += "8";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "8"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "8"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "8"); 
    } 
}

function BtnDialPad9_onclick() 
{
    EditPhoneNo.value += "9";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "9"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "9"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "9"); 
    }
}

function BtnDialPadStar_onclick() 
{
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "*"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "*"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "*"); 
    }
}

function BtnDialPad0_onclick() 
{
    EditPhoneNo.value += "0";
    if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "0"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "0"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "0"); 
    }
}

function BtnDialPadNo_onclick() 
{
   if(consulting==1){//向磋商通道发DTMF
        DigitDTMF(consultLineNo, "#"); 
    }else if(meetmeing==1){//向三方会议通道发DTMF
        DigitDTMF(meetmeLineNo, "#"); 
    }else{//向主动外呼通道发DTMF
        DigitDTMF(busiLineNo, "#"); 
    }
}



function StartDialTone()
{
   
    StartTone();
}

function StopDialTone()
{
    
    StopTone();
}


function BtnConsultTransfer_onclick() 
{
    
}


//三方通话
function MeetMe(){
        if(document.getElementById("meetBtn").value=="结束会议"){
            doDisMeetMe();
            return;
        }
        
        var callno = window.showModalDialog("dialPad.html?nowdate="+new Date(),window,"status:no;scroll:no;location:no;dialogWidth:300px;dialogHeight:300px");
        
        if(callno==""||callno==null){
            alert("分机号码不能空");
            return;
        }else{
            
            if(!isNumber(callno)){
                alert("分机号码应为数字");
                return;
            }
        }
        
        LineNo = FindLine();
        if(LineNo == -1) 
        {
            alert("No line is free");
            return;
        }
        
         //-1代表使用默认声卡设备         
        InputDeviceId  = 0;
        OutputDeviceId = 0;
                
                
        
        meetmeLineNo = LineNo;
        
        
        if(!DialCall(LineNo, callno, InputDeviceId, OutputDeviceId))
        {
            ErrorMessage();
        }else{
            document.getElementById("meetBtn").value="结束会议";
            
            setBtnDisabled("transferBtn",true);
            setBtnDisabled("consultBtn",true);
            
        }
    
}


//结束第三方通话
function doDisMeetMe(){
    
    if(!Disconnect(meetmeLineNo)){
        ErrorMessage();
        meetmeing = 0;
        meetmeLineNo = -1;
    }else{
        meetmeing = 0;
        meetmeLineNo = -1;
        document.getElementById("meetBtn").value="三方会议";
        document.getElementById("showError").innerHTML = "三方会议结束";
        
        setBtnDisabled("transferBtn",false);
        setBtnDisabled("consultBtn",false);
    }
    
}


//磋商
function doConsult(){
    
    if(document.getElementById("consultBtn").value=="结束磋商"){
        doDisConsult();
        return;
    }
    
    var callno = window.showModalDialog("dialPad.html?nowdate="+new Date(),window,"status:no;scroll:no;location:no;dialogWidth:300px;dialogHeight:300px");

    if(callno==""||callno==null){
        alert("分机号码不能空");
        return;
    }else{
        if(!isNumber(callno)){
            alert("分机号码应为数字");
            return;
        }
    }
    LineNo = FindLine();
    if(LineNo == -1) 
    {
        alert("No line is free");
        return;
    }
    //-1代表使用默认声卡设备          
    InputDeviceId  = 0;
    OutputDeviceId = 0;
                
    consultLineNo = LineNo;
    if(!DialCall(LineNo, callno, InputDeviceId, OutputDeviceId))
    {
        ErrorMessage();
    }else{
        document.getElementById("consultBtn").value="结束磋商";
        if(!HoldLine(busiLineNo))
            ErrorMessage();
        setBtnDisabled("transferBtn",true);
        setBtnDisabled("meetBtn",true);
        
    }
}


//结束磋商
function doDisConsult(){
    if(!Disconnect(consultLineNo)){
        ErrorMessage();
        consulting =0;
        consultLineNo = -1;
    }else{
        consulting = 0;
        consultLineNo = -1;
        document.getElementById("consultBtn").value="磋商";
        if(!UnHoldLine(busiLineNo))
            ErrorMessage();
        setBtnDisabled("transferBtn",false);
        setBtnDisabled("meetBtn",false);
        
    }
    
}



function ErrorMessage()
{
    VaxError = GetVaxObjectError();
    
    switch(VaxError)
    {
        case 10: alert("You are not online, please click the 'Online' button first to dial/receive the calls.");
            break;

        case 11: alert("Cann't open local communication port. Another softphone (x-Ten, x-lite, skype etc) is already running. Please close it first.");
            break;
        
        case 12: alert("License Key is not valid.");
            break;
    
        case 13: alert("Fail to initialize VaxVoIP task window.");
            break;

        case 14: alert("Cann't access Input/Mic device or device is already in use.");
            break;
        
        case 15: alert("Cann't access Output/Speaker device or device is already in use.");
            break;

        case 16: alert("Input/Mic device is not open."); 
            break;

        case 17: alert("Output/Speaker device is not open."); 
            break;

        case 18: alert("Your sound device does not support mic volume."); 
            break;

        case 19: alert("Your sound device does not support speaker volume."); 
            break;

        case 20: alert("Recording media initialization fail.");
            break;

        case 21: alert("Cann't open the wave file.");
            break;
        
        case 22: alert("Provided SIP URI is not valid.");
            break;

        case 23: alert("Codec is not supported.");
            break;
        
        case 24: alert("Error to create SDP (Session Description Protocol) request.");
            break;
        
        case 25: alert("Error to create CONNECTION request. Please check the provided SIP URI is valid.");
            break;

        case 26: alert("Error to create REGISTER request. Please check the provided SIP URI is valid.");
            break;

        case 27: alert("Error to create UN-REGISTER request. Please check the provided SIP URI is valid.");
            break;

        case 28: alert("Error to create DISCONNECT request.");
            break;

        case 29: alert("Line No is not valid.");
            break;
        
        case 30: alert("Line is already busy.");
            break;
            
        case 31: alert("Line is not open.");
            break;
            
        case 32: alert("Invalid Call-Id.");
            break;
            
        case 33: alert("Provided value is not valid.");
            break;
            
        case 34: alert("Selected line is not in voice session.");
            break;
            
        case 35: alert("Fail to read wave file.");
            break;
            
        case 36: alert("Fail to write wave file.");
            break;
            
        case 37: alert("Unsupported wave file format.");
            break;
            
        case 38: alert("Error to create CANCEL request.");
            break;
            
        case 39: alert("License limit exceeded.");
            break;

        case 40: alert("Unable to find contact or contact is not added.");
            break;
            
        case 41: alert("Remote user is not online or remote user is failed to subscribe to the SIP SERVER");
            break;
            
        case 42: alert("Error to create chat status message.");
            break;
            
        case 43: alert("Error to create add contact message.");
            break;
    }
}




function CheckForwardCall_onclick() 
{
    if(EditForwardCallPhoneNo.value == "")
    {
        CheckForwardCall.checked = false;
        alert("Please enter a phone number.");
        return;
    }
    
    if(!ForwardCall(CheckForwardCall.checked, EditForwardCallPhoneNo.value))
    {
        ErrorMessage();
        return;
    }
}

</script>    
<!-- 软电话各种事件(注册、下线、来电、呼叫等) -->
<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnTryingToRegister()">
OnTryingToRegister();
</script>

<script>
function OnTryingToRegister()
{
    document.getElementById("showError").innerHTML = "尝试上线";
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToRegister()">
OnSuccessToRegister();
</script>
<script type="text/javascript" src="http://domain:port/support/api/25.0/interaction.js"></script>
<script type="text/javascript" >
function OnSuccessToRegister()
{
    /*alert('###############################dengluchenggong  ');
    //SF-tab2显示
    sforce.interaction.runApex('SoftPhoneController','renderedTab','flag=true',
    function(response)
    {
        //alert('!!!!!!!!!!!!!!!!!!!!!  '+response.result);
        //alert('!!!!!!!!!!!!!!!!!!!!!error  '+response.error);
    });
    rerenderTpe();
    alert('###############################dengluchenggong2222  ');*/
    document.getElementById("showError").innerHTML = "上线成功";
    /*
    setBtnDisabled("onLineBtn",true);
    setBtnDisabled("offLineBtn",false);
    setBtnDisabled("callBtn",false);*/
    
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToRegister()">
OnFailToRegister();
</script>

<script>
function OnFailToRegister()
{
    document.getElementById("showError").innerHTML = "上线失败";
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToRegisterEx(StatusCode, ReasonPhrase)">
OnFailToRegisterEx(StatusCode, ReasonPhrase);

</script>

<script>
function OnFailToRegisterEx(StatusCode, ReasonPhrase)
{
    document.getElementById("showError").innerHTML = "上线失败";
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnTryingToReRegister()">
OnTryingToReRegister();
</script>

<script>
function OnTryingToReRegister()
{
    //AddToStatusLogList("Trying to re-register.");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToReRegister()">
OnSuccessToReRegister();
</script>

<script>
function OnSuccessToReRegister()
{
    //AddToStatusLogList("Re-registered successfully.");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToReRegister()">
OnFailToReRegister();
</script>

<script>
function OnFailToReRegister()
{
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToReRegisterEx(StatusCode, ReasonPhrase)">
OnFailToReRegisterEx(StatusCode, ReasonPhrase);
</script>

<script>
function OnFailToReRegisterEx(StatusCode, ReasonPhrase)
{
    //AddToStatusLogList("Fail to Re-Register: " + ReasonPhrase);
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnTryingToUnRegister()">
OnTryingToUnRegister();
</script>

<script>
function OnTryingToUnRegister()
{
    //AddToStatusLogList("Trying to un-register.");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToUnRegister()">
OnSuccessToUnRegister();
</script>

<script>
function OnSuccessToUnRegister()
{
    
    document.getElementById("showError").innerHTML = "下线成功";
}
</script>


<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToUnRegister()">
OnFailToUnRegister();
</script>

<script>
function OnFailToUnRegister()
{
    document.getElementById("showError").innerHTML = "下线失败";
}
</script>
    
<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnIncomingCall(CallId, DisplayName, UserName, FromURI, ToURI)">
OnIncomingCall(CallId, DisplayName, UserName, FromURI, ToURI);
</script>

<script>
//来电事件，在此事件中实现来电弹屏 
function OnIncomingCall(CallId, DisplayName, UserName, FromURI, ToURI)
{
//alert('##############'+CallId);
    //循环检测当前有无通话，如果有自动拒接
    for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
    {
        if(IsLineBusy(LineNo)) {
            if(!RejectCall(CallId))
            {
                return;
            }else{
                return;
            }
        }
    } 
     
    callType = "in";
    aCallId = CallId;
    aDisplayName = UserName;
    EditPhoneNo.value = aDisplayName;
    subscribeCall(aDisplayName);
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnIncomingCallRingingStart(CallId)">
OnIncomingCallRingingStart(CallId);
</script>

<script>
//来电振铃事件
function OnIncomingCallRingingStart(CallId)
{
    //alert('###########振铃###'+CallId);
    
    //循环检测当前有无通话，如果有自动拒接
    for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
    {
        if(IsLineBusy(LineNo)) {
            if(!RejectCall(CallId))
            {
                return;
            }else{
                return;
            }
        }
    } 
    StartTone();
    document.getElementById("showError").innerHTML = "来电振铃";
    setBtnDisabled("callBtn",true);
    setBtnDisabled("acceptBtn",false);
    setBtnDisabled("rejectBtn",false);
    
}
</script>  
    

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnIncomingCallRingingStop(CallId)">
OnIncomingCallRingingStop(CallId);
</script>

<script>
function OnIncomingCallRingingStop(CallId)
{
    StopTone();
    document.getElementById("showError").innerHTML = "振铃结束";
    setBtnDisabled("callBtn",false);
    setBtnDisabled("acceptBtn",true);
    setBtnDisabled("rejectBtn",true);
}
</script>  
    
<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnIncomingDiagnostic(MsgSIP, FromIP, FromPort)">
OnIncomingDiagnostic(MsgSIP, FromIP, FromPort);
</script>

<script>
function OnIncomingDiagnostic(MsgSIP, FromIP, FromPort)
{
}
</script>  

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnOutgoingDiagnostic(MsgSIP, ToIP, ToPort)">
OnOutgoingDiagnostic(MsgSIP, ToIP, ToPort);
</script>

<script>
function OnOutgoingDiagnostic(MsgSIP, ToIP, ToPort)
{
}
</script>  

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnDTMFDigit(LineNo, Digit)">
OnDTMFDigit(LineNo, Digit);
</script>

<script>
function OnDTMFDigit(LineNo, Digit)
{
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Key-pressed: " + Digit);
}
</script>  
    
<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnPlayWaveDone(LineNo)">
OnPlayWaveDone(LineNo);
</script>

<script>
function OnPlayWaveDone(LineNo)
{
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Play wave file done.");
}
</script>   

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToConnect(LineNo)">
OnFailToConnect(LineNo);
</script>

<script>
function OnFailToConnect(LineNo)
{
    StopDialTone();
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Fail to connect.");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnConnecting(LineNo)">
OnConnecting(LineNo);
</script>

<script>
function OnConnecting(LineNo)
{
   document.getElementById("showError").innerHTML = "正在呼叫";
}
</script>   

<!-- ============成功接通=============== -->
<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToConnect(LineNo, ToRTPIP, ToRTPPort)">
OnSuccessToConnect(LineNo, ToRTPIP, ToRTPPort);
</script>

<script>
function OnSuccessToConnect(LineNo, ToRTPIP, ToRTPPort)
{
    StopDialTone();
    
    if(LineNo==consultLineNo){
        consulting = 1;
    }else if(LineNo==meetmeLineNo){
        meetmeing = 1;
    }else{
        if(callType=="in"){
            DigitDTMF(LineNo,"#");
            
        }
        
    }
    
    document.getElementById("showError").innerHTML = "通话成功";
    AcceptPhone();
}
</script>   

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnDisconnectCall(LineNo)">
OnDisconnectCall(LineNo);
</script>

<script>
function OnDisconnectCall(LineNo)
{
    StopDialTone();
    document.getElementById("showError").innerHTML = "挂断";
    
    if(hangupflag){
        if(consulting==1){
            if(LineNo==consultLineNo){
                consulting = 0;
                consultLineNo = -1;
            }
        }else{
            
        }
        alert('#########关掉1');
        setBtnDisabled("callBtn",false);
        setBtnDisabled("acceptBtn",true);
        setBtnDisabled("rejectBtn",true);
        setBtnDisabled("hangUpBtn",true);
        setBtnDisabled("transferBtn",true);
        setBtnDisabled("consultBtn",true);
        setBtnDisabled("meetBtn",true);
        setBtnDisabled("holdBtn",true);
        setBtnDisabled("unholdBtn",true);
    }else{
        if(consulting==1){
            if(LineNo==consultLineNo){
                doDisConsult();
            }else if(LineNo==busiLineNo){
                for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
                {
                    if(IsLineBusy(LineNo)) {
                        if(!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                consultLineNo = -1;
                consulting = 0;
                alert('#########关掉2');
                setBtnDisabled("callBtn",false);
                setBtnDisabled("acceptBtn",true);
                setBtnDisabled("rejectBtn",true);
                
                setBtnDisabled("transferBtn",true);
                setBtnDisabled("consultBtn",true);
                setBtnDisabled("meetBtn",true);
                setBtnDisabled("holdBtn",true);
                setBtnDisabled("unholdBtn",true);
                
                
            }
        }else if(meetmeing==1){
            if(LineNo==meetmeLineNo){
                doDisMeetMe();
            }else if(LineNo==busiLineNo){
                for(LineNo = 0; LineNo < m_nTotalLine; LineNo++)
                {
                    if(IsLineBusy(LineNo)) {
                        if(!Disconnect(LineNo))
                            ErrorMessage();
                    }
                }
                meetmeing = 0;
                meetmeLineNo = -1;
                alert('#########关掉3');
                setBtnDisabled("callBtn",false);
                setBtnDisabled("acceptBtn",true);
                setBtnDisabled("rejectBtn",true);
                
                setBtnDisabled("transferBtn",true);
                setBtnDisabled("consultBtn",true);
                setBtnDisabled("meetBtn",true);
                setBtnDisabled("holdBtn",true);
                setBtnDisabled("unholdBtn",true);
            }
        }else{
            if(LineNo==busiLineNo){
                //挂断界面
                HangUpPhone();
            }
            
        }
    }
    
    //document.getElementById("consultBtn").value="磋商";
    //document.getElementById("meetBtn").value="三方会议";
}
</script> 

<!-- ========VaxSIPUserAgentCAB ========= -->


<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnCallTransferAccepted(LineNo)">
OnCallTransferAccepted(LineNo);
</script>

<script>
function OnCallTransferAccepted(LineNo)
{
     document.getElementById("showError").innerHTML = "转接成功";
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToTransfer(LineNo, StatusCode, ReasonPhrase)">
OnFailToTransfer(LineNo, StatusCode, ReasonPhrase);
</script>

<script>
function OnFailToTransfer(LineNo, StatusCode, ReasonPhrase)
{
     document.getElementById("showError").innerHTML = "转接失败";
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnProvisionalResponse(LineNo, StatusCode, ReasonPhrase)">
OnProvisionalResponse(LineNo, StatusCode, ReasonPhrase);
</script>

<script>
function OnProvisionalResponse(LineNo, StatusCode, ReasonPhrase)
{
   //alert("主动挂断OnProvisionalResponse");
    
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnRedirectionResponse(LineNo, StatusCode, ReasonPhrase, Contact)">
OnRedirectionResponse(LineNo, StatusCode, ReasonPhrase, Contact);
</script>

<script>
function OnRedirectionResponse(LineNo, StatusCode, ReasonPhrase, Contact)
{
    //alert("#############OnRedirectionResponse");
    StopDialTone();
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnServerFailureResponse(LineNo, StatusCode, ReasonPhrase)">
OnServerFailureResponse(LineNo, StatusCode, ReasonPhrase);
</script>

<script>
function OnServerFailureResponse(LineNo, StatusCode, ReasonPhrase)
{
    //alert("#################OnServerFailureResponse");
    StopDialTone();
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnGeneralFailureResponse(LineNo, StatusCode, ReasonPhrase)">
OnGeneralFailureResponse(LineNo, StatusCode, ReasonPhrase);
</script>

<script>
function OnGeneralFailureResponse(LineNo, StatusCode, ReasonPhrase)
{
    //alert("#####################OnGeneralFailureResponse");
    StopDialTone();
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnRequestFailureResponse(LineNo, StatusCode, ReasonPhrase)">
OnRequestFailureResponse(LineNo, StatusCode, ReasonPhrase);
</script>

<script>
function OnRequestFailureResponse(LineNo, StatusCode, ReasonPhrase)
{ 
    if(StatusCode=='481')
    {
        BtnHangUp_onclick();
    }
    StopDialTone();
    //AddToStatusLogList("Line-" + (LineNo + 1) + ": Response: " + ReasonPhrase + ".");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSessionLostEvent(LineNo)">
OnSessionLostEvent(LineNo);
</script>

<script>
function OnSessionLostEvent(LineNo)
{

}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToHold(LineNo)">
OnSuccessToHold(LineNo);
</script>

<script>
function OnSuccessToHold(LineNo)
{
    document.getElementById("showError").innerHTML = "保持通话";
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnTryingToHold(LineNo)">
OnTryingToHold(LineNo);
</script>

<script>
function OnTryingToHold(LineNo)
{
    
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToHold(LineNo)">
OnFailToHold(LineNo);
</script>

<script>
function OnFailToHold(LineNo)
{

}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnSuccessToUnHold(LineNo)">
OnSuccessToUnHold(LineNo);
</script>

<script>
function OnSuccessToUnHold(LineNo)
{
    document.getElementById("showError").innerHTML = "恢复通话";
}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnTryingToUnHold(LineNo)">
OnTryingToUnHold(LineNo);
</script>

<script>
function OnTryingToUnHold(LineNo)
{

}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnFailToUnHold(LineNo)">
OnFailToUnHold(LineNo);
</script>

<script>
function OnFailToUnHold(LineNo)
{

}
</script> 

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnMsgNOTIFY(Msg)">
OnMsgNOTIFY(Msg);
</script>

<script>
function OnMsgNOTIFY(Msg)
{
}
</script>   

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnVoiceMailMsg(IsMsgWaiting, NewMsgCount, OldMsgCount, NewUrgentMsgCount, OldUrgentMsgCount, MsgAccount)">
OnVoiceMailMsg(IsMsgWaiting, NewMsgCount, OldMsgCount, NewUrgentMsgCount, OldUrgentMsgCount, MsgAccount);
</script>

<script>
function OnVoiceMailMsg(IsMsgWaiting, NewMsgCount, OldMsgCount, NewUrgentMsgCount, OldUrgentMsgCount, MsgAccount)
{
}
</script>   

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatContactStatus(UserName, StatusId)">
OnChatContactStatus(UserName, StatusId);
</script>

<script>
function OnChatContactStatus(UserName, StatusId)
{
   
}
</script>  

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatSendMsgTextSuccess(UserName, MsgText, UserValue32bit)">
OnChatSendMsgTextSuccess(UserName, MsgText, UserValue32bit);
</script>

<script>
function OnChatSendMsgTextSuccess(UserName, MsgText, UserValue32bit)
{
    //AddToStatusLogList("Send Message Success");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatSendMsgTextFail(UserName, StatusCode, sReasonPhrase, MsgText, UserValue32bit)">
OnChatSendMsgTextFail(UserName, StatusCode, sReasonPhrase, MsgText, UserValue32bit);
</script>

<script>
function OnChatSendMsgTextFail(UserName, StatusCode, sReasonPhrase, MsgText, UserValue32bit)
{
    //AddToStatusLogList("Send Message Fail");
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatSendMsgTypingSuccess(UserName, UserValue32bit)">
OnChatSendMsgTypingSuccess(UserName, UserValue32bit);
</script>

<script>
function OnChatSendMsgTypingSuccess(UserName, UserValue32bit)
{
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatSendMsgTypingFail(UserName, StatusCode, ReasonPhrase, UserValue32bit)">
OnChatSendMsgTypingFail(UserName, StatusCode, ReasonPhrase, UserValue32bit);
</script>

<script>
function OnChatSendMsgTypingFail(UserName, StatusCode, ReasonPhrase, UserValue32bit)
{
}
</script>


<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatRecvMsgText(UserName, MsgText)">
OnChatRecvMsgText(UserName, MsgText);
</script>

<script>
function OnChatRecvMsgText(UserName, MsgText)
{
    
}
</script>  


<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatRecvMsgTypingStart(UserName)">
OnChatRecvMsgTypingStart(UserName);
</script>

<script>
function OnChatRecvMsgTypingStart(UserName)
{
   
}
</script>

<script language="javascript" FOR="VaxEmbedCAB" EVENT="OnChatRecvMsgTypingStop(UserName)">
OnChatRecvMsgTypingStop(UserName);
</script>

<script>
function OnChatRecvMsgTypingStop(UserName)
{
   
}
</script>

<script>
function GetCallId(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.GetCallId(nLineNo);
    else
        return VaxSIPUserAgentCAB.GetCallId(String(Number(nLineNo)));       
}

function GetMicSoundLevel()
{
    return VaxSIPUserAgentCAB.GetMicSoundLevel();
}

function GetSpkSoundLevel()
{
    return VaxSIPUserAgentCAB.GetSpkSoundLevel();
}

function GetAudioInDevTotal()
{
    return VaxSIPUserAgentCAB.GetAudioInDevTotal();
}

function GetAudioOutDevTotal()
{
    return VaxSIPUserAgentCAB.GetAudioOutDevTotal();
}

function GetAudioOutDevName(nDeviceId)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.GetAudioOutDevName(nDeviceId);
    else
        return VaxSIPUserAgentCAB.GetAudioOutDevName(String(Number(nDeviceId)));        
}

function GetAudioInDevName(nDeviceId)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.GetAudioInDevName(nDeviceId);
    else
        return VaxSIPUserAgentCAB.GetAudioInDevName(String(Number(nDeviceId)));     
}

function SetDomainKey(sLicenceKey)
{
    return VaxSIPUserAgentCAB.SetDomainKey(sLicenceKey);
}


function InitializeEx(bBindToListenIP, sListenIP, nListenPort, sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, bUseSoundDevice, nTotalLine)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.InitializeEx(bBindToListenIP, sListenIP, nListenPort, sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, bUseSoundDevice, nTotalLine);
    else
        return VaxSIPUserAgentCAB.InitializeEx(String(Number(bBindToListenIP)), sListenIP, String(Number(nListenPort)), sUserName, sLogin, sLoginPwd, sDisplayName, sDomainRealm, sSIPProxy, sSIPOutBoundProxy, String(Number(bUseSoundDevice)), String(Number(nTotalLine)));       
}


function Initialize(bBindToListenIP, sListenIP, nListenPort, sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, bUseSoundDevice, nTotalLine)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.Initialize(bBindToListenIP, sListenIP, nListenPort, sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, bUseSoundDevice, nTotalLine);
    else
        return VaxSIPUserAgentCAB.Initialize(String(Number(bBindToListenIP)), sListenIP, String(Number(nListenPort)), sFromURI, sSIPOutBoundProxy, sSIPProxy, sLoginId, sLoginPwd, String(Number(bUseSoundDevice)), String(Number(nTotalLine)));        
}

function UnInitialize()
{
    VaxSIPUserAgentCAB.UnInitialize();
}

function RegisterToProxy(nExpire)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.RegisterToProxy(nExpire);
    else
        return VaxSIPUserAgentCAB.RegisterToProxy(String(Number(nExpire)));
}

function UnRegisterToProxy()
{
    return VaxSIPUserAgentCAB.UnRegisterToProxy();
}
    
function OpenLine(nLineNo, bBindToRTPRxIP, sRTPRxIP, nRTPRxPort)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.OpenLine(nLineNo, bBindToRTPRxIP, sRTPRxIP, nRTPRxPort);      
    else
        return VaxSIPUserAgentCAB.OpenLine(String(Number(nLineNo)), String(Number(bBindToRTPRxIP)), sRTPRxIP, String(Number(nRTPRxPort)));
}

function CloseLine(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.CloseLine(nLineNo);
    else
        return VaxSIPUserAgentCAB.CloseLine(String(Number(nLineNo)));       
}

function GetVaxObjectError()
{
    return VaxSIPUserAgentCAB.GetVaxObjectError();
}

function DialCall(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.DialCall(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId);
    else
        return VaxSIPUserAgentCAB.DialCall(String(Number(nLineNo)), sDialNo, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));
}
            
function Connect(nLineNo, sToURI, nInputDeviceId, nOutputDeviceId)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.Connect(nLineNo, sDialNo, nInputDeviceId, nOutputDeviceId);
    else
        return VaxSIPUserAgentCAB.Connect(String(Number(nLineNo)), sDialNo, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));
}
    
function Disconnect(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.Disconnect(nLineNo);
    else
        return VaxSIPUserAgentCAB.Disconnect(String(Number(nLineNo)));      
}

function AcceptCall(nLineNo, sCallId, nInputDeviceId, nOutputDeviceId)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.AcceptCall(nLineNo, sCallId, nInputDeviceId, nOutputDeviceId);
    else
        return VaxSIPUserAgentCAB.AcceptCall(String(Number(nLineNo)), sCallId, String(Number(nInputDeviceId)), String(Number(nOutputDeviceId)));        
}

function RejectCall(sCallId)
{
    return VaxSIPUserAgentCAB.RejectCall(sCallId);
}
    
function TransferCallEx(nLineNo, sToUserName)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.TransferCallEx(nLineNo, sToUserName);
    else
        return VaxSIPUserAgentCAB.TransferCallEx(String(Number(nLineNo)), sToUserName);     
}

/*
function TransferCall(nLineNo, sToURI)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.TransferCall(nLineNo, sToURI);
    else
        return VaxSIPUserAgentCAB.TransferCall(String(Number(nLineNo)), sToURI);        
}
*/

function JoinTwoLine(nLineNoA, nLineNoB)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.JoinTwoLine(nLineNoA, nLineNoB);
    else
        return VaxSIPUserAgentCAB.JoinTwoLine(String(Number(nLineNoA)), String(Number(nLineNoB)));      
}
    
function HoldLine(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.HoldLine(nLineNo);
    else
        return VaxSIPUserAgentCAB.HoldLine(String(Number(nLineNo)));        
}

function UnHoldLine(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.UnHoldLine(nLineNo);
    else
        return VaxSIPUserAgentCAB.UnHoldLine(String(Number(nLineNo)));      
}
    
function IsLineOpen(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.IsLineOpen(nLineNo);
    else
        return VaxSIPUserAgentCAB.IsLineOpen(String(Number(nLineNo)));      
}

function IsLineHold(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.IsLineHold(nLineNo);
    else
        return VaxSIPUserAgentCAB.IsLineHold(String(Number(nLineNo)));      
}

function IsLineBusy(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.IsLineBusy(nLineNo);
    else
        return VaxSIPUserAgentCAB.IsLineBusy(String(Number(nLineNo)));      
}
    
function EnableKeepAlive(nSeconds)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.EnableKeepAlive(nSeconds);
    else
        return VaxSIPUserAgentCAB.EnableKeepAlive(String(Number(nSeconds)));        

}

function DisableKeepAlive()
{
    VaxSIPUserAgentCAB.DisableKeepAlive();
}

function DeselectAllVoiceCodec()
{
    VaxSIPUserAgentCAB.DeselectAllVoiceCodec();
}

function SelectAllVoiceCodec()
{
    VaxSIPUserAgentCAB.SelectAllVoiceCodec();
}

function SelectVoiceCodec(nCodecNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.SelectVoiceCodec(nCodecNo);
    else
        return VaxSIPUserAgentCAB.SelectVoiceCodec(String(Number(nCodecNo)));       
}

function DeselectVoiceCodec(nCodecNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.DeselectVoiceCodec(nCodecNo);
    else
        return VaxSIPUserAgentCAB.DeselectVoiceCodec(String(Number(nCodecNo)));     
}

function GetMyIP()
{
    return VaxSIPUserAgentCAB.GetMyIP();
}
    
function DigitDTMF(nLineNo, sDigit)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.DigitDTMF(nLineNo, sDigit);
    else
        return VaxSIPUserAgentCAB.DigitDTMF(String(Number(nLineNo)), sDigit);       
}

function SetDTMFVolume(nVolume)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.SetDTMFVolume(nVolume);
    else
        return VaxSIPUserAgentCAB.SetDTMFVolume(String(Number(nVolume)));

}

function GetDTMFVolume()
{
    return VaxSIPUserAgentCAB.GetDTMFVolume();
}

function EnableForceInbandDTMF(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.EnableForceInbandDTMF(nLineNo);       
    else
        return VaxSIPUserAgentCAB.EnableForceInbandDTMF(String(Number(nLineNo)));
}

function DisableForceInbandDTMF(nLineNo)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.DisableForceInbandDTMF(nLineNo);
    else
        return VaxSIPUserAgentCAB.DisableForceInbandDTMF(String(Number(nLineNo)));      
}



function EnableMicBoost()
{
    return VaxSIPUserAgentCAB.EnableMicBoost();
}

function DisableMicBoost()
{
    return VaxSIPUserAgentCAB.DisableMicBoost();
}

function IsMicBoostEnable()
{
    return VaxSIPUserAgentCAB.IsMicBoostEnable();
}

function EnableAGC(nLevel)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.EnableAGC(nLevel);
    else
        return VaxSIPUserAgentCAB.EnableAGC(String(Number(nLevel)));        
}

function DisableAGC()
{
    return VaxSIPUserAgentCAB.DisableAGC();
}
    
function EnableEchoNoiseCancellation()
{
    return VaxSIPUserAgentCAB.EnableEchoNoiseCancellation();
}

function DisableEchoNoiseCancellation()
{
    return VaxSIPUserAgentCAB.DisableEchoNoiseCancellation();
}


function EnableDonotDisturb()
{
    VaxSIPUserAgentCAB.EnableDonotDisturb();
}

function DisableDonotDisturb()
{
    VaxSIPUserAgentCAB.DisableDonotDisturb();
}






function ConfAllowLine(nLineNo, bAllowListen, bAllowSpeak)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.ConfAllowLine(nLineNo, bAllowListen, bAllowSpeak);
    else
        return VaxSIPUserAgentCAB.ConfAllowLine(String(Number(nLineNo)), String(Number(bAllowListen)), String(Number(bAllowSpeak)));
}





function ForwardCall(bEnable, sToUserName)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.ForwardCall(bEnable, sToUserName);
    else
        return VaxSIPUserAgentCAB.ForwardCall(String(Number(bEnable)), sToUserName);
}

function VoiceChanger(nPitch)
{
    if(m_bIsInternetExplorerBrowser)
        return VaxSIPUserAgentCAB.VoiceChanger(nPitch);
    else
        return VaxSIPUserAgentCAB.VoiceChanger(String(Number(nPitch)));
}

</script>