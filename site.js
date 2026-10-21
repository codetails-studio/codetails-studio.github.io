'use strict';
const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('#mobile-menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Apri navigazione');mobileMenu.hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Chiudi navigazione':'Apri navigazione');mobileMenu.hidden=!open;});
mobileMenu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuButton.focus();}});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const gallery=document.querySelector('.gallery');
const galleryButtons=[...document.querySelectorAll('.screen-button')];
document.querySelectorAll('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>gallery.scrollBy({left:Number(button.dataset.galleryStep)*(galleryButtons[0].offsetWidth+22),behavior:reduceMotion.matches?'instant':'smooth'})));
const dialog=document.querySelector('.image-dialog');
const dialogImage=document.querySelector('#dialog-image');
const caption=document.querySelector('#image-caption');
const imageCount=document.querySelector('#image-count');
let selected=0;
function showImage(index){selected=(index+galleryButtons.length)%galleryButtons.length;const image=galleryButtons[selected].querySelector('img');dialogImage.src=image.currentSrc||image.src;dialogImage.alt=image.alt;caption.textContent=`${String(selected+1).padStart(2,'0')} / ${galleryButtons[selected].nextElementSibling.textContent.replace(/^\d{2}/,'').trim()}`;imageCount.textContent=`${selected+1} / ${galleryButtons.length}`;}
galleryButtons.forEach((button,index)=>button.addEventListener('click',()=>{showImage(index);dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelectorAll('[data-dialog-step]').forEach(button=>button.addEventListener('click',()=>showImage(selected+Number(button.dataset.dialogStep))));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showImage(selected+1);}if(event.key==='ArrowLeft'){event.preventDefault();showImage(selected-1);}});
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
