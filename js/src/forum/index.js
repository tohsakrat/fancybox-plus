import app from 'flarum/forum/app';
import  { extend, override }  from 'flarum/common/extend';
//import CommentPost from 'flarum/forum/components/CommentPost';

import CommentPost from 'flarum/forum/components/CommentPost';
import Post from 'flarum/forum/components/Post';javascript:;
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
//import PostsUserPage from 'flarum/forum/components/PostsUserPage';
import { Fancybox } from '@fancyapps/ui';
import WelcomeHero from 'flarum/forum/components/WelcomeHero';

import Search from 'flarum/forum/components/Search';

import Button from 'flarum/common/components/Button';
import NotificationList from 'flarum/forum/components/NotificationList';

import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import PostControls from 'flarum/forum/utils/PostControls';

import listItems from 'flarum/common/helpers/listItems';

import Dropdown from 'flarum/common/components/Dropdown';

import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
//import DiscussionsUserPage from 'flarum/forum//components/DiscussionsUserPage';
app.initializers.add('darkle/fancybox', () => {
    
 
 
 console.log('fancybox initializeAll')
     
      //--------------------------fancybox--------------------------
      
     Fancybox.defaults.Image = { zoom: false };

     extend(CommentPost.prototype, 'oncreate', function (vnode) {
         
      console.log('fancybox initializePost')     
      
          var elements1=Array.prototype.slice.call(this.element.querySelectorAll('img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview])'))
          var elements2=Array.prototype.slice.call(this.element.querySelectorAll(':is(blockquote,details,.bbspoiler-blur,.chatroom,.no-fancybox) img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview])'))
    
            elements1=elements1.filter((e) =>{
            return elements2.indexOf(e) == -1 
    
            } )
           // console.log(elements1)
            //给所有图片存一下src
            elements1.forEach((node) => {
              node.setAttribute('data-src',  node.getAttribute('src'));
               node.setAttribute('alt',  'loading');
             });
             
             
           // 给第一批图片设置src
           
           elements1.forEach((node) => {
               
            node.setAttribute('transed', 'true');  
        
          if(
        this.attrs.post.data.attributes.number <Math.floor(app.current.data.stream.index)+1
          &&this.attrs.post.data.attributes.number <Math.floor(app.current.data.stream.index)-1
          ){
              //符合条件的加fancybx
            const fancyboxEl = document.createElement('a');
            fancyboxEl.setAttribute('data-fancybox', 'responsive');
            fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));
            $(node).wrap(fancyboxEl);
            node.setAttribute('isFancy', 'true');  
              
          }else{
              //不符合的loading
              node.setAttribute('src', '');  
          }
          
        });
  
  
     });
  

     window.updateFancyboxLazyLoad=()=>{
         if(!app.current.data.stream)return;
         var selector='img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview]):not([isFancy])'
         
         var elements1=Array.prototype.slice.call(document.querySelectorAll(
         '.PostStream-item[data-index="'+Math.floor(app.current.data.stream.index) +'"] '+selector+','+
            '.PostStream-item[data-index="'+(Math.floor(app.current.data.stream.index)-1)+'"] '+selector+','+
            '.PostStream-item[data-index="'+(Math.floor(app.current.data.stream.index)+1) +'"] '+selector
        ))
        
      var elements2=Array.prototype.slice.call(document.querySelectorAll(':is(blockquote,details,.bbspoiler-blur,.chatroom,.no-fancybox) img:not(.emoji):not(.Avatar):not(.flaemoji-customized):not([data-reaction]):not([data-link-preview])'))
      
       elements1=elements1.filter((e) =>{
        return elements2.indexOf(e) == -1 
        } )
        
        
        elements1.forEach((node) => {
            
                const fancyboxEl = document.createElement('a');
                fancyboxEl.setAttribute('data-fancybox', 'responsive');
                node.setAttribute('src', node.getAttribute('data-src') );  
                fancyboxEl.setAttribute('data-src', node.getAttribute('data-src') || node.getAttribute('src'));
                $(node).wrap(fancyboxEl);
                node.setAttribute('isFancy', 'true');  
        });
        

        

     }
    
    
      window.addEventListener('scroll', window.updateFancyboxLazyLoad); 
    
        
  
  
});


