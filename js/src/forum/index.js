import app from  'flarum/forum/app';
import  { extend, override }  from 'flarum/common/extend';
//import CommentPost from 'flarum/forum/components/CommentPost';

import CommentPost from 'flarum/forum/components/CommentPost';
//import PostsUserPage from 'flarum/forum/components/PostsUserPage';
import { Fancybox } from '@fancyapps/ui';
//import DiscussionsUserPage from 'flarum/forum//components/DiscussionsUserPage';
app.initializers.add('tohsakarat-fancybox-plus', () => {
    
 
 
  //console.log('fancybox initializeAll')


      //--------------------------贴内fancybox--------------------------
      
     Fancybox.defaults.Image = { zoom: false };

     extend(CommentPost.prototype, 'refreshContent', function (vnode) {
         
      //console.log('fancybox initializePost')     
      
      //---------获取设置--------
     // console.log("app")
    //  console.log(app)
    //  console.log("forum")
     // console.log(app.forum)
      let cdnUrl = app.forum.attribute('tohsakarat-fancybox-plus.pic-cdnUrl');
      let useCdn = app.forum.attribute('tohsakarat-fancybox-plus.use-cdnUrl');
      let useResize = app.forum.attribute('tohsakarat-fancybox-plus.use-resize');
    //  console.log("fancybox获取设置完成")
      //--------------------------给所有符合增加fancybox条件的帖子设置data-src--------------------------
      //注意排除掉已经有fancy或者已经设置过data-src的图片

        //所有符合条件的图片
          var elements1=Array.prototype.slice.call(this.element.querySelectorAll('img:not([data-src]):not([isfancy]):not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview])'))
          
        //应当被排除的图片，主要是涉及到折叠等逻辑，用户希望隐藏的
          var elements2=Array.prototype.slice.call(this.element.querySelectorAll(':is(blockquote,details,.bbspoiler-blur,.chatroom,.no-fancybox) img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview]), .editing img'))

            elements1=elements1.filter((e) =>{return elements2.indexOf(e) == -1 } )//排除不应该被加fancy的图片
            if(!elements1.length)return;
           // console.log('=====fancybox设置=====')
  
           // console.log(this.element)
            //给所有图片存一下src
            elements1.forEach((node) => {

              let originalSrc=node.getAttribute('src');//去掉https


              //检查是否符合url替换条件
              function checkUrl(url) {
                const mainDomain = window.location.origin; // 获取当前主域名，包含协议
                const absolutePathPattern = new RegExp(`^${mainDomain}/assets/`); // 生成绝对路径的正则表达式
                const relativePathPattern = /^\/assets\//; // 生成相对路径的正则表达式
              
                // 检查绝对路径或相对路径
                if (absolutePathPattern.test(url) || relativePathPattern.test(url)) {
                  return true; // 如果URL符合条件，判断为真
                }
              
                return false; // 否则判断为假
              }
              let dataSrc,previewSrc;
              
              // 如果符合条件，替换为cdnUrl
              if (checkUrl(originalSrc) && useCdn ) {
                
                dataSrc =  "//"+ cdnUrl + originalSrc.replace(window.location.origin,'')
              
              }else{
                  dataSrc = originalSrc;
              }

            // 如果符合条件，替换为cdnUrl
            if (useResize ) {
                previewSrc = originalSrc.replace(/(\.jpg|\.png)$/i, '.medium$1')

            }else{
                previewSrc = originalSrc;
              }



              node.setAttribute('data-src', dataSrc);
               node.setAttribute('alt',  'loading');
               node.setAttribute('src' ,  previewSrc)
               node.setAttribute('loading' , 'lazy');
                node.setAttribute('importantce' , 'low');
                node.setAttribute('decoding' , 'async');
          
             });
             
             
             
             
             
             
            //--------处理第一次进入帖子，
             let visibleIndex;//当屏幕不可滚动时，最大可见post
             let tempI;//一个计数器
             let tempSum=0;//一个累加器
             
             if(document.querySelector('.PostStream')){
                         //保证是在贴子里
                         let postStreamDom=Array.prototype.slice.call(document.querySelector('.PostStream').children);
                        for(tempI=0;tempI<postStreamDom.length;tempI++){
                            if(!(( app.current.data.stream.index-1)<1))break;  
                            tempSum+=postStreamDom[tempI].offsetHeight;
                            visibleIndex=postStreamDom[tempI].dataset.index+1;//楼层计数钟第0层属于Hero，不算Stream,所以要在streamIndex上+1
                            if(tempSum>window.innerHeight)break;   
                        }     
                        
                   // 给第一批图片设置src,当前的帖子和前后两个帖子
                       
                       elements1.forEach((node) => {
                           
                            node.setAttribute('transed', 'true');  
        
        
                        //如果帖子是在0层，执行可见范围判断
                        //如果帖子不在0层，执行前后两个帖子判断
                            if(
                            (
                            ( ( app.current.data.stream.index-1)<1)    
                            &&(this.attrs.post.data.attributes.number<=visibleIndex)
                          
                            )
                              ||
                            (this.attrs.post.data.attributes.number < Math.floor(app.current.data.stream.index-1)+1
                            &&this.attrs.post.data.attributes.number >Math.floor(app.current.data.stream.index-1)-1 )
                            ){
            
            
                          //符合条件的加fancybx
                            const fancyboxEl = document.createElement('a');
                            fancyboxEl.setAttribute('data-fancybox', 'responsive');
                            fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));
                            $(node).wrap(fancyboxEl);
                            node.setAttribute('isFancy', 'true');  
                            
                           node.setAttribute('loading' , 'eager');
                            node.setAttribute('importantce' , 'medium');
                                      
                          }else{
                              //不符合的loading
                              node.setAttribute('src', '');  
                          }
                      
                    });
              
                 
             }else{
                    elements1.forEach((node) => {
                           
                        node.setAttribute('transed', 'true');  
                        const fancyboxEl = document.createElement('a');
                        fancyboxEl.setAttribute('data-fancybox', 'responsive');
                        fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));
                        $(node).wrap(fancyboxEl);
                        node.setAttribute('isFancy', 'true');  
                        
                           node.setAttribute('loading' , 'eager');
                            node.setAttribute('importantce' , 'medium');
                        
                    })
     
                 
                 
             }


  
     });//至此帖子内部的处理逻辑写完
  

    //--------------------------全局懒加载事件--------------------------

     window.updateFancyboxLazyLoad=()=>{
         if(!document.querySelector('.PostStream') )return;
          if(!app.current.data.stream)return;
         var selector='img:not([isfancy]):not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview]):not([isFancy])'
         
         var elements1=Array.prototype.slice.call(document.querySelectorAll(
         '.PostStream-item[data-index="'+Math.floor(app.current.data.stream.index-1) +'"] '+selector+','+
            '.PostStream-item[data-index="'+(Math.floor(app.current.data.stream.index-1)-1)+'"] '+selector+','+
            '.PostStream-item[data-index="'+(Math.floor(app.current.data.stream.index-1)+1) +'"] '+selector
        ))
        
      var elements2=Array.prototype.slice.call(document.querySelectorAll(':is(blockquote,details,.bbspoiler-blur,.chatroom,.no-fancybox) img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview]), .editing img'))
      
         var elements3=Array.prototype.slice.call(document.querySelectorAll(
         '.PostStream-item[data-index="'+Math.floor(app.current.data.stream.index-1) +'"] '
        ))
       elements1=elements1.filter((e) =>{
        return (elements2.indexOf(e) == -1 )&&( elements3.indexOf(e) == -1 )

        } )//排除不应该被加fancy的图片
        elements3=elements3.filter((e) =>{
        return elements2.indexOf(e) == -1 
        } )//排除不应该被加fancy的图片
        
        
        elements1.forEach((node) => {
            
                const fancyboxEl = document.createElement('a');
                fancyboxEl.setAttribute('data-fancybox', 'responsive');
                 node.setAttribute('src' , node.getAttribute('data-src').replace(/(\.jpg|\.png)$/i, '.medium$1'))

                fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));
                $(node).wrap(fancyboxEl);
                node.setAttribute('isFancy', 'true');  
                
        });
         elements3.forEach((node) => {
               node.setAttribute('loading' , 'eager');
               node.setAttribute('importantce' , 'medium');
        });

        

     }
    
    
      window.addEventListener('scroll', window.updateFancyboxLazyLoad); 
    
        
  
  
});


