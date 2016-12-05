<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class WechatSDK extends Model
{
    //
    /*
     * 回复关键字 多图文消息
    * */
    public function __construct()
    {
        $this->Token = env('WECHAT_TOKEN','');
        $this->appid = env('WECHAT_APPID','');
        $this->appsecret = env('WECHAT_SECRET','');
    }
    public function replyNewsMsg($postObj,$content)
    {
        $toUser = $postObj->FromUserName;
        $fromUser = $postObj->ToUserName;
        $time = time();
        $MsgType = 'news';
        $temp = "<xml>
                    <ToUserName><![CDATA[%s]]></ToUserName>
                    <FromUserName><![CDATA[%s]]></FromUserName>
                    <CreateTime>%s</CreateTime>
                    <MsgType><![CDATA[%s]]></MsgType>
                    <ArticleCount>".count($content)."</ArticleCount>
                    <Articles>";
        foreach($content as $k=>$v) {
            $temp .= "<item>
                    <Title><![CDATA[".$v['title']."]]></Title>
                    <Description><![CDATA[".$v['description']."]]></Description>
                    <PicUrl><![CDATA[".$v['picUrl']."]]></PicUrl>
                    <Url><![CDATA[".$v['url']."]]></Url>
                    </item>";
        }
        $temp .= "</Articles>
                    </xml> ";
        $info = sprintf($temp,$toUser,$fromUser,$time,$MsgType);
    //        Log::info($info);
        echo $info;
    }
    //回复 单文本消息
    public function replyTextMsg($postObj,$content)
    {
        //回复消息模板
        $temp = "<xml>
                <ToUserName><![CDATA[%s]]></ToUserName>
                <FromUserName><![CDATA[%s]]></FromUserName>
                <CreateTime>%s</CreateTime>
                <MsgType><![CDATA[%s]]></MsgType>
                <Content><![CDATA[%s]]></Content>
                </xml>";
        $toUser = $postObj->FromUserName;
        $fromUser = $postObj->ToUserName;
        $time = time();
        $MsgType = 'text';
        $info = sprintf($temp,$toUser,$fromUser,$time,$MsgType,$content);
//        Log::info($info);
        echo $info;
    }
    //回复图片消息
    public function replyImageMsg($postObj,$content)
    {
        //回复消息模板
        $temp = "<xml>
                 <ToUserName><![CDATA[%s]]></ToUserName>
                 <FromUserName><![CDATA[%s]]></FromUserName>
                 <CreateTime>%s</CreateTime>
                 <MsgType><![CDATA[%s]]></MsgType>
                 <PicUrl><![CDATA[%s]]></PicUrl>
                 <Image>
                <MediaId><![CDATA[%s]]></MediaId>
                </Image>
                 </xml>";
        $toUser = $postObj->FromUserName;
        $fromUser = $postObj->ToUserName;
        $time = time();
        $MsgType = 'image';
        $info = sprintf($temp,$toUser,$fromUser,$time,$MsgType,$content);
//        Log::info($info);
        echo $info;
    }
    //新增临时文件
    public function insertTemporaryMedia($postObj,$type)
    {
        $access_token = $this->_getCache('access_token');
        $api = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token='.$access_token.'&type='.$type;
    }
    //http请求GET 和POST
    public function http_request($url,$data = null)
    {
        //1 初始化
        $ch = curl_init();
        //2 设置参数
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //https请求 不验证证书 其实只用这个就可以了
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //https请求 不验证HOST
        //验证post 请求
        if(!empty($data)){
            curl_setopt($ch,CURLOPT_POST,1);//模拟post提交
            curl_setopt($ch,CURLOPT_POSTFIELDS,$data);//post提交内容
        }
        //3 调用接口 采集数据
        $outopt = curl_exec($ch);
        //4 关闭资源
        curl_close($ch);
        $outopt = \GuzzleHttp\json_decode($outopt,true);
        return $outopt;
    }

    /*
     * 获取微信AccessToken
     *
     * */
    public function getAccessToken()
    {
        $access_token = $this->_getCache('access_token');
        if(!$access_token){
            $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$this->appid.'&secret='.$this->appsecret;
            $res = $this->http_request($url);
            $access_token = $res['access_token'];
//            var_dump($access_token);
            #access_token的有效期目前为2个小时 设置时间单位分钟
            $this->_setCache('access_token',$access_token,119);
        }
        return $access_token;
    }

    //缓存获取
    public function _setCache($key,$value,$min)
    {
        Cache::put($key,$value,$min);
    }
    public function _getCache($key)
    {
        return Cache::get($key);
    }
    //获取用户基本信息
    public function getUserInfos($postObj)
    {
        $access_token = $this->getAccessToken();
        $openid = $postObj->FromUserName;
        $url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
        return $this->http_request($url);
    }
    //获取用户当地地址
    public function getUserLocation()
    {

    }
    //获取jsapi_ticket
    public function getJsApiTicket()
    {
        $jsapi_ticket = $this->_getCache('jsapi_ticket');
        if(!$jsapi_ticket){
            $access_token = $this->getAccessToken();
            $url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$access_token.'&type=jsapi';
            $res = $this->http_request($url);
            $jsapi_ticket = $res['ticket'];
            $this->_setCache('jsapi_ticket',$jsapi_ticket,119);
        }
        return $jsapi_ticket;
    }

    public function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }
    //获取16位随机数
    public function getRandCode($num = 16)
    {
        $arr = [
            'A','B','C','D','E','F','G','H','I','J','K','O','P','Q','U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','o','p','q','u','v','w','x','y','z',
            '0','1','2','3','4','5','6','7','8','9'
        ];
        $tmpStr = '';
        for($i=1;$i<=$num;$i++){
            $key = rand(0,count($arr)-1);
            $tmpStr .= $arr[$key];
        }
//        Log::info($tmpStr);
        return $tmpStr;
    }

}
