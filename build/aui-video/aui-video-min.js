AUI.add("aui-video",function(c){var h=c.Lang,i=c.UA,d=c.getClassName,l="video",b=d(l),j=d(l,"node"),g=c.config.base+"aui-video/assets/player.swf",f=c.config.doc,a='<video id="{0}" width="100%" height="100%" controls="controls" class="'+j+'"></video>',e='<div class="'+j+'"></div>';var k=c.Component.create({NAME:l,ATTRS:{url:{value:""},ogvUrl:{value:""},swfUrl:{value:g},poster:{value:""},fixedAttributes:{value:{}},flashVars:{value:{}},render:{value:true}},BIND_UI_ATTRS:["url","poster","ogvUrl","swfUrl","fixedAttributes","flashVars"],SYNC_UI_ATTRS:["url","poster","ogvUrl"],prototype:{renderUI:function(){var m=this;m._renderVideoTask=c.debounce(m._renderVideo,1,m);m._renderSwfTask=c.debounce(m._renderSwf,1,m);m._renderVideo(!m.get("ogvUrl"));},bindUI:function(){var m=this;m.publish("videoReady",{fireOnce:true});},_renderSwf:function(){var t=this;var p=t.get("swfUrl");if(p){var s=t.get("url");var u=t.get("poster");var q=t.get("flashVars");c.mix(q,{controls:true,src:s,poster:u});var m=c.QueryString.stringify(q);if(t._swfId){t._video.removeChild(c.one("#"+t._swfId));}else{t._swfId=c.guid();}var n='<object id="'+t._swfId+'" ';if(i.ie){n+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';}else{n+='type="application/x-shockwave-flash" data="'+p+'" ';}n+='height="100%" width="100%">';if(i.ie){n+='<param name="movie" value="'+p+'"/>';}var r=t.get("fixedAttributes");for(var o in r){n+='<param name="'+o+'" value="'+r[o]+'" />';}if(m){n+='<param name="flashVars" value="'+m+'" />';}if(u!=""){n+='<img src="'+u+'" alt="" />';}n+="</object>";t._video.append(n);}},_renderVideo:function(q){var m=this;var n=a;if(i.gecko&&q){n=e;}var p=h.sub(n,[c.guid()]);var o=c.Node.create(p);m.get("contentBox").append(o);m._video=o;},_uiSetFixedAttributes:function(n){var m=this;m._renderSwfTask();},_uiSetFlashVars:function(n){var m=this;m._renderSwfTask();},_uiSetOgvUrl:function(q){var m=this;if(i.gecko){var o=m._video;var n=m._usingVideo();if((!q&&n)||(q&&!n)){o.remove(true);m._renderVideoTask(!q);}if(!q){m._renderSwfTask();}else{var p=m._sourceOgv;if(!p){p=new c.Node(f.createElement("source"));p.attr("type",'video/ogg; codecs="theora, vorbis"');o.append(p);m._sourceOgv=p;}p.attr("src",q);}}},_uiSetPoster:function(o){var m=this;var n=m._video;if(m._usingVideo()){n.setAttribute("poster",o);}m._renderSwfTask();},_uiSetSwfUrl:function(n){var m=this;m._renderSwfTask();},_uiSetUrl:function(q){var o=this;var n=o.get("ogvUrl");var p=o._video;var m=o._sourceMp4;if(i.gecko&&!o._usingVideo()){if(m!=null){m.remove(true);o._sourceMp4=null;}}else{if(p||!n){if(!m){m=new c.Node(f.createElement("source"));m.attr("type","video/mp4;");p.append(m);o._sourceMp4=m;}m.attr("src",q);}}o._renderSwfTask();},_usingVideo:function(){var m=this;return(m._video.get("nodeName").toLowerCase()=="video");}}});c.Video=k;},"@VERSION@",{requires:["aui-base","querystring-stringify-simple"],skinnable:true});