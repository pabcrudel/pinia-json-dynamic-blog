import{u as p,a as h,i as g,o as a,b as r,d as e,e as s,g as n,_ as f,F as c,j as P}from"./index-0ec734b9.js";import{_ as u}from"./LinkedPostList -1ff4294e.js";const y=["innerHTML"],B=e("hr",null,null,-1),H=["innerHTML"],L=e("hr",null,null,-1),M=e("hr",null,null,-1),T=e("hr",null,null,-1),k=e("hr",null,null,-1),x={__name:"Post",setup(N){const i=p(),o=h(),t=o.getPostByPath(i.fullPath),l=o.getRelatedPosts(t.category,t.name),_=o.getPostsByProp("category",t.category,!1),{title:d,description:m}=t.metadata;return g({title:d,meta:[{name:"description",content:m}]}),(R,V)=>(a(),r(c,null,[e("h1",{innerHTML:s(t).title},null,8,y),B,e("p",{innerHTML:s(t).content},null,8,H),L,n(f,{class:"post",title:"Etiquetas",terms:s(t).tags},null,8,["terms"]),s(l).size>0?(a(),r(c,{key:0},[M,n(u,{title:"Articulos Relacionados",posts:s(l)},null,8,["posts"])],64)):P("",!0),T,n(u,{title:"Otros articulos que podrian interesarte",posts:s(_)},null,8,["posts"]),k],64))}};export{x as default};