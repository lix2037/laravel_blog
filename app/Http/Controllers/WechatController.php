<?php

namespace App\Http\Controllers;

use App\Http\Model\WechatSDK;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

use App\Http\Requests;

class WechatController extends Controller
{
    //
    private $token;
    private $appid;
    private $appsecret;

    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function __construct()
    {
        $this->appid = env('WECHAT_APPID','');
        $this->Token = env('WECHAT_TOKEN','');
        $this->SDK   = new WechatSDK();
    }

    public function serve(Request $request)
    {
        $token = $this->Token;
        //判断是否是GET请求 第一次验证
        if($request->isMethod('GET')){
            $input = $request->all();

            $signature = $input['signature'];
            $echostr = $input['echostr'];
            $timestamp = $input["timestamp"];
            $nonce = $input["nonce"];
            $tmpArr = array($token, $timestamp, $nonce);
            //字典排序 sha1 加密
            sort($tmpArr, SORT_STRING);
            $tmpStr = implode( $tmpArr );
            $tmpStr = sha1( $tmpStr );

            if( $tmpStr == $signature && $echostr ) {
                echo $echostr;
            } else{
                echo 'Error';
            }
        }
        //第二次（之后所有的）请求 都是POST
        else {
            $postArr = $GLOBALS['HTTP_RAW_POST_DATA'];
            //转换xml对象
            $postObj = simplexml_load_string($postArr);
//            Log::info($postArr);
            $this->weChatMsgType($postObj);
        }
    }



    /*自定义菜单创建
    *
    */
    public function menu_create()
    {
        $wechatSDK = new WechatSDK();
        $access_token = $wechatSDK->getAccessToken();
//        var_dump($access_token);exit;
        $url =  "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$access_token;
        $data = '{
                 "button":[
                 {
                      "name":"日常查询",
                      "sub_button":[
                          {
                            "type":"click",
                            "name":"笑话大全",
                            "key":"joke"
                          },
                          {
                            "type":"click",
                            "name":"天气预报",
                            "key":"weather"
                          },
                          {
                            "type":"click",
                            "name":"历史上的今天 ",
                            "key":"japi"
                          }
                      ]
                 },

                 ]
             }';

        return $wechatSDK->http_request($url ,$data);
    }
    /*
     * 自定义菜单查询
     * */
    public function menu_select()
    {
        $wechatSDK = new WechatSDK();
        $access_token = $wechatSDK->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token='.$access_token;

        return $wechatSDK->http_request($url);
    }

    /*
     * 自定义菜单删除
     * */
    public function menu_delete()
    {
        $wechatSDK = new WechatSDK();
        $access_token = $wechatSDK->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token='.$access_token;
        return $wechatSDK->http_request($url);
    }
    /*
     * 微信API信息类型判断
     *
     * */
    public function weChatMsgType($postObj)
    {
        //text 文本,image 图片,voice 语音,video 视频,shortvideo 小视频，location  地理位置，link 链接消息
        //转换小写 strtolower($postObj->MsgType)
        $wechatSDK = new WechatSDK();
        switch(strtolower($postObj->MsgType)){
            case 'event':
                //关注事件
                switch($postObj->Event){
                #事件类型，subscribe(订阅)、unsubscribe(取消订阅)
                    case 'subscribe':
                        //关注事件
                        $content = [
                            [
                                'title'=> '龙之谷',
                                'description' => '龙之谷',
                                'picUrl' => "http://download.t.sdo.com/cdn/gameRec/brand/logo_slogan_white_v2_small.png",
                                'url' => "http://dn.sdo.com/web10/index/index.html"
                            ],
                        ];
                        $wechatSDK = new WechatSDK();
                        return $wechatSDK->replyNewsMsg($postObj,$content);
                        break;
                    case 'unsubscribe':
                        //取消关注
                        break;
                    case 'CLICK':
                        switch($postObj->EventKey){
                            case 'joke':
                                $jokeAPiKey = '3bb81b5ab6f6cafa02e558c748f8282f';
                                $jokeAPIUrl = 'http://v.juhe.cn/joke/randJoke.php?key='.$jokeAPiKey.'&type=';
                                $res = $this->SDK->http_request($jokeAPIUrl);
                                $key = rand(0,count($res['result']));
                                $content = $res['result'][$key]['content'];

                                return $this->SDK->replyTextMsg($postObj,$content);
                                /*$content = [
                                    [
                                        'title'=> '百度一下',
                                        'description' => '百度一下',
                                        'picUrl' => "http://images.china.cn/attachement/jpg/site1000/20161124/ac9e174e118119a0669801.jpg",
                                        'url' => "https://www.baidu.com"
                                    ],
                                    [
                                        'title'=> '土豆',
                                        'description' => '优酷土豆',
                                        'picUrl' => "http://c.hiphotos.baidu.com/image/pic/item/d009b3de9c82d1585e277e5f840a19d8bd3e42b2.jpg",
                                        'url' => "http://www.tudou.com"
                                    ],
                                    [
                                        'title'=> '龙之谷',
                                        'description' => '龙之谷',
                                        'picUrl' => "http://download.t.sdo.com/cdn/gameRec/brand/logo_slogan_white_v2_small.png",
                                        'url' => "http://dn.sdo.com/web10/index/index.html"
                                    ],
                                ];

//                                return $wechatSDK->replyNewsMsg($postObj,$content);*/
                                break;
                            case 'japi':
                                $japiAppKey = '7af846b8921a957bead3e3f67c12a4f3';
                                $month = date('m');
                                $day=date('d');
                                $japiurl = 'http://v.juhe.cn/todayOnhistory/queryEvent.php?key='.$japiAppKey.'&date='.$month.'/'.$day;
                                $data = $this->SDK->http_request($japiurl);
                                $key = rand(0,count($data['result']));
                                $content = $data['result'][$key];
                                $content = $content['date'].$content['title'];

                                return $this->SDK->replyTextMsg($postObj,$content);
                                break;
                            case 'weather':
                                $content = '请输入"城市名+天气"来获取最新天气预报';
                                return $this->SDK->replyTextMsg($postObj,$content);
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 'text':
                //文本消息
                #从消息的结尾数第二个字符开始截取，截取两个字符，然后加以判断是否为 “天气” 关键字
                $str = mb_substr($postObj->Content,-2,2,"UTF-8");
                #从消息的开头开始，截掉末尾的两个字符（天气），既得地区关键字。
                $str_key = mb_substr($postObj->Content,0,-2,"UTF-8");
                if($str == '天气' && !empty($str_key)){
                    $cityname = urlencode($str_key);
                    $weatherAppKey = 'f588b3bdad5a28db8f1ce2ca609a0bc0';
                    $juheweatherapi = 'http://op.juhe.cn/onebox/weather/query?cityname='.$cityname.'&key='.$weatherAppKey;
                    $data = $this->SDK->http_request($juheweatherapi);
                    $data = $data['result']['data'];
                    $content = "【".$data['realtime']['city_name']."天气预报】\n".$data['realtime']['date']." ".$data['realtime']['time']."时发布"."\n\n实时天气\n当前温度".$data['realtime']['weather']['temperature']."\n湿度".$data['realtime']['weather']['humidity']."\n天气".$data['realtime']['weather']['info']."\n\n温馨提示：\n1 穿衣: ".$data['life']['info']['chuanyi'][1]."\n2 感冒: ".$data['life']['info']['ganmao'][1]."\n3 运动: ".$data['life']['info']['yundong'][1];
                }else{
                    switch(trim($postObj->Content)){
                        case '有趣':
                            $content = [
                                [
                                    'title'=> '百度一下',
                                    'description' => '百度一下',
                                    'picUrl' => "http://images.china.cn/attachement/jpg/site1000/20161124/ac9e174e118119a0669801.jpg",
                                    'url' => "https://www.baidu.com"
                                ],
                                [
                                    'title'=> '土豆',
                                    'description' => '优酷土豆',
                                    'picUrl' => "http://c.hiphotos.baidu.com/image/pic/item/d009b3de9c82d1585e277e5f840a19d8bd3e42b2.jpg",
                                    'url' => "http://www.tudou.com"
                                ],
                                [
                                    'title'=> '龙之谷',
                                    'description' => '龙之谷',
                                    'picUrl' => "http://download.t.sdo.com/cdn/gameRec/brand/logo_slogan_white_v2_small.png",
                                    'url' => "http://dn.sdo.com/web10/index/index.html"
                                ],
                            ];
                            break;
                        default:
                            $content = '没有找到你要的"'.$postObj->Content.'"哦';
                            break;
                    }
                }

                $wechatSDK = new WechatSDK();
                return $wechatSDK->replyTextMsg($postObj,$content);
                break;
            case 'link ':
                //链接消息
                break;
            //其他事件
            default:

                break;
        }
    }

    //微信分享
    public function shareWx()
    {
        $appid = $this->appid;
//        $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PATH_INFO'];
//        $url = 'http://hogus.ngrok.cc/shareWx';
        // 注意 URL 一定要动态获取，不能 hardcode.
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $jsapi_ticket = $this->SDK->getJsApiTicket();
        $timestamp = time();
//        $noncestr = $this->SDK->getRandCode(16);
        $noncestr = $this->SDK->createNonceStr(16);

        $signature = 'jsapi_ticket='.$jsapi_ticket.'&noncestr='.$noncestr.'&timestamp='.$timestamp.'&url='.$url;
//        Log::info($url);
        $signature = sha1($signature);

        return view('wechat.share',compact(['appid',
                                            'timestamp',
                                            'jsapi_ticket',
                                            'noncestr',
                                            'url',
                                            'signature'
                                            ])
                    );
    }


}
