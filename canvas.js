
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGI_TOP=60;
var MARGIN_LEFT=30;
const  endTime=new Date(2017,3,8,3,0,0);//���õ���ʱ�Ľ�ֹʱ��
var curShowTimeSceond=0;
window.onload=function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    canvas.lineWidth=2;
    curShowTimeSceond=getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render(context);
            update();
        },
        50
    );
}
function getCurrentShowTimeSeconds(){
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();//ret���汣����Ǻ�����
    ret=Math.round(ret/1000)//��������ת��Ϊ����������roundת����֤��
    return ret>0?ret:0;
}
function update(){//�Ƚ���һ��ʱ��͵�ǰʱ��
    var nextShowTimeSecond=getCurrentShowTimeSeconds();
    var nexthours=parseInt(nextShowTimeSecond/3600);
    var nextminutes=parseInt((nextShowTimeSecond-nexthours*3600)/60);
    var nextsecond=nextShowTimeSecond%60;

    var curhours=parseInt(curShowTimeSceond/3600);
    var curminutes=parseInt((curShowTimeSceond-curhours*3600)/60);
    var cursecond=curShowTimeSceond%60;
    if(nextsecond!=cursecond){
        curShowTimeSceond=nextShowTimeSecond;
    }
}
function render(cxt){
    //�Ծ��ο��ڵ�ͼ�����ˢ�²���
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=parseInt(curShowTimeSceond/3600);
    var minutes=parseInt((curShowTimeSceond-hours*3600)/60);
    var second=curShowTimeSceond%60;
    //����hourse����һ�������ں�����ռ�߸�����Ϊ�˶�һ�㣬������15*��radius+1��;
    renderDigit(MARGIN_LEFT,MARGI_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGI_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGI_TOP,10,cxt);//����ð��
    //���÷�minutes
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGI_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGI_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGI_TOP,10,cxt);
    //������
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGI_TOP,parseInt(second/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGI_TOP,parseInt(second%10),cxt);

}
function renderDigit(x,y,num,cxt){//��ά����ı�������digit��num����i����j������1����Բ
    cxt.fillStyle="blue";
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);//Բ������λ�ã��ڣ�ij����Բ��Բ�ĵ�λ���ǣ�centerX��x+j*2*(R+1)+(R+1);centerY:y+i*2*(R+1)+(R+1) ע�⣺i��j�Ǵ�0��ʼ�����
                 cxt.closePath();

                cxt.fill();
            }
        }
}