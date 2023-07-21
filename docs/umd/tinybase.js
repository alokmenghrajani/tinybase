var e,t;e=this,t=function(e){"use strict";const t=e=>typeof e,s="",n=t(s),a=t(!0),o=t(0),r=t(t),l="type",i="default",c="Listener",d="Result",u="add",h="Ids",f="Table",g=f+"s",L=f+h,w="Row",S=w+h,T="Sorted"+w+h,v="Cell",R=v+h,y="Value",I=y+"s",p=y+h,C=e=>s+e,b=Math.max,V=Math.min,m=isFinite,E=(e,t)=>e instanceof t,k=e=>null==e,M=(e,t,s)=>k(e)?s?.():t(e),x=e=>e==n||e==a,D=e=>t(e)==r,J=e=>Array.isArray(e),A=()=>{},F=(e,t)=>e.includes(t),Q=(e,t)=>e.every(t),z=(e,t)=>W(e)===W(t)&&Q(e,((e,s)=>t[s]===e)),N=(e,t)=>Q(e,((s,n)=>0==n||t(e[n-1],s)<=0)),j=(e,t)=>e.sort(t),O=(e,t)=>e.forEach(t),P=(e,t)=>e.map(t),B=e=>q(e,((e,t)=>e+t),0),W=e=>e.length,$=e=>0==W(e),q=(e,t,s)=>e.reduce(t,s),G=(e,t,s)=>e.slice(t,s),H=(e,...t)=>e.push(...t),K=e=>e.pop(),U=e=>e.shift(),X=Object,Y=X.keys,Z=X.isFrozen,_=X.freeze,ee=e=>E(e,X)&&e.constructor==X,te=(e,t)=>!k(((e,t)=>M(e,(e=>e[t])))(e,t)),se=(e,t)=>(delete e[t],e),ne=(e,t)=>P(X.entries(e),(([e,s])=>t(s,e))),ae=e=>ee(e)&&0==(e=>W(Y(e)))(e),oe=e=>e.size,re=(e,t)=>e?.has(t)??!1,le=e=>k(e)||0==oe(e),ie=e=>[...e?.values()??[]],ce=e=>e.clear(),de=(e,t)=>e?.forEach(t),ue=(e,t)=>e?.delete(t),he=e=>new Map(e),fe=e=>[...e?.keys()??[]],ge=(e,t)=>e?.get(t),Le=(e,t)=>de(e,((e,s)=>t(s,e))),we=(e,t,s)=>k(s)?(ue(e,t),e):e?.set(t,s),Se=(e,t,s)=>(re(e,t)||we(e,t,s()),ge(e,t)),Te=(e,t,s,n=we)=>(ne(t,((t,n)=>s(e,n,t))),Le(e,(s=>te(t,s)?0:n(e,s))),e),ve=(e,t,s)=>{const n={};return de(e,((e,a)=>{const o=t?t(e,a):e;!s?.(o,e)&&(n[a]=o)})),n},Re=(e,t,s)=>ve(e,(e=>ve(e,t,s)),ae),ye=(e,t,s)=>ve(e,(e=>Re(e,t,s)),ae),Ie=(e,t)=>{const s=he();return de(e,((e,n)=>s.set(n,t?.(e)??e))),s},pe=e=>Ie(e,Ie),Ce=e=>Ie(e,pe),be=(e,t,s,n,a=0)=>M((s?Se:ge)(e,t[a],a>W(t)-2?s:he),(o=>{if(a>W(t)-2)return n?.(o)&&we(e,t[a]),o;const r=be(o,t,s,n,a+1);return le(o)&&we(e,t[a]),r})),Ve=e=>{const s=t(e);return x(s)||s==o&&m(e)?s:void 0},me=(e,t,s,n,a)=>k(a)?e.delCell(t,s,n,!0):e.setCell(t,s,n,a),Ee=(e,t,s)=>k(s)?e.delValue(t):e.setValue(t,s),ke=e=>new Set(J(e)||k(e)?e:[e]),Me=(e,t)=>e?.add(t),xe=(e,t,s)=>{const n=e.hasRow,a=he(),o=he(),r=he(),l=he(),i=he(),c=(t,s,...n)=>{const a=Se(i,t,ke);return O(n,(t=>Me(a,t)&&s&&e.callListener(t))),n},d=(t,...s)=>M(ge(i,t),(n=>{O($(s)?ie(n):s,(t=>{e.delListener(t),ue(n,t)})),le(n)&&we(i,t)})),u=(e,s)=>{we(a,e,s),re(o,e)||(we(o,e,t()),we(r,e,he()),we(l,e,he()))},h=e=>{we(a,e),we(o,e),we(r,e),we(l,e),d(e)};return[()=>e,()=>fe(a),e=>Le(o,e),e=>re(o,e),e=>ge(a,e),e=>ge(o,e),(e,t)=>we(o,e,t),u,(t,a,o,i,h)=>{u(t,a);const f=he(),g=he(),L=ge(r,t),w=ge(l,t),S=t=>{const o=s=>e.getCell(a,t,s),r=ge(L,t),l=n(a,t)?s(i(o,t)):void 0;if(r===l||J(r)&&J(l)&&z(r,l)||we(f,t,[r,l]),!k(h)){const e=ge(w,t),s=n(a,t)?h(o,t):void 0;e!=s&&we(g,t,s)}},T=e=>{o((()=>{de(f,(([,e],t)=>we(L,t,e))),de(g,((e,t)=>we(w,t,e)))}),f,g,L,w,e),ce(f),ce(g)};Le(L,S),e.hasTable(a)&&O(e.getRowIds(a),(e=>{re(L,e)||S(e)})),T(!0),d(t),c(t,0,e.addRowListener(a,null,((e,t,s)=>S(s))),e.addTableListener(a,(()=>T())))},h,()=>Le(i,h),c,d]},De=(e,a)=>t(e)==n?t=>t(e):e??(()=>a??s),Je=e=>{const t=new WeakMap;return s=>(t.has(s)||t.set(s,e(s)),t.get(s))},Ae=/^\d+$/,Fe=()=>{const e=[];let t=0;return[n=>(n?U(e):null)??s+t++,t=>{Ae.test(t)&&W(e)<1e3&&H(e,t)}]},Qe=e=>{let t;const[n,a]=Fe(),o=he();return[(a,r,l,i=[],c=(()=>[]))=>{t??=e();const d=n(1);return we(o,d,[a,r,l,i,c]),Me(be(r,l??[s],ke),d),d},(e,n,...a)=>O(((e,t=[s])=>{const n=[],a=(e,s)=>s==W(t)?H(n,e):null===t[s]?de(e,(e=>a(e,s+1))):O([t[s],null],(t=>a(ge(e,t),s+1)));return a(e,0),n})(e,n),(e=>de(e,(e=>ge(o,e)[0](t,...n??[],...a))))),e=>M(ge(o,e),(([,t,n])=>(be(t,n??[s],void 0,(t=>(ue(t,e),le(t)?1:0))),we(o,e),a(e),n))),e=>M(ge(o,e),(([e,,s=[],n,a])=>{const o=(...r)=>{const l=W(r);l==W(s)?e(t,...r,...a(r)):k(s[l])?O(n[l]?.(...r)??[],(e=>o(...r,e))):o(...r,s[l])};o()}))]},ze=Je((e=>{let t,n,a,o=100,r=he(),l=he(),i=1;const c=he(),d=he(),[u,h,f]=Qe((()=>Q)),g=he(),L=he(),w=[],S=[],T=(t,s)=>{i=0,e.transaction((()=>{const[n,a]=ge(g,s);de(n,((s,n)=>de(s,((s,a)=>de(s,((s,o)=>me(e,n,a,o,s[t]))))))),de(a,((s,n)=>Ee(e,n,s[t])))})),i=1},v=e=>{we(g,e),we(L,e),h(d,[e])},R=(e,t)=>O(((e,t)=>e.splice(0,t))(e,t??W(e)),v),y=()=>R(w,W(w)-o),I=()=>M(t,(()=>{H(w,t),y(),R(S),t=void 0,a=1})),p=()=>{t=K(w),a=1},C=e.addCellListener(null,null,null,((e,t,s,n,a,o)=>{if(i){I();const e=Se(r,t,he),l=Se(e,s,he),i=Se(l,n,(()=>[o,void 0]));i[1]=a,i[0]===a&&le(we(l,n))&&le(we(e,s))&&le(we(r,t))&&p(),x()}})),b=e.addValueListener(null,((e,t,s,n)=>{if(i){I();const e=Se(l,t,(()=>[n,void 0]));e[1]=s,e[0]===s&&le(we(l,t))&&p(),x()}})),V=(e="")=>(k(t)&&(t=s+n++,we(g,t,[r,l]),J(t,e),r=he(),l=he(),a=1),t),m=()=>{$(w)||(((e,...t)=>{e.unshift(...t)})(S,V()),T(0,t),t=K(w),a=1)},E=()=>{$(S)||(H(w,t),t=U(S),T(1,t),a=1)},x=()=>{a&&(h(c),a=0)},D=e=>{const t=V(e);return x(),t},J=(e,t)=>(A(e)&&ge(L,e)!==t&&(we(L,e,t),h(d,[e])),Q),A=e=>re(g,e),Q={setSize:e=>(o=e,y(),Q),addCheckpoint:D,setCheckpoint:J,getStore:()=>e,getCheckpointIds:()=>[[...w],t,[...S]],forEachCheckpoint:e=>Le(L,e),hasCheckpoint:A,getCheckpoint:e=>ge(L,e),goBackward:()=>(m(),x(),Q),goForward:()=>(E(),x(),Q),goTo:e=>{const s=F(w,e)?m:F(S,e)?E:null;for(;!k(s)&&e!=t;)s();return x(),Q},addCheckpointIdsListener:e=>u(e,c),addCheckpointListener:(e,t)=>u(t,d,[e]),delListener:e=>(f(e),Q),clear:()=>(R(w),R(S),k(t)||v(t),t=void 0,n=0,D(),Q),destroy:()=>{e.delListener(C),e.delListener(b)},getListenerStats:()=>({})};return _(Q.clear())})),Ne=(e,t)=>e<t?-1:1,je=Je((e=>{const t=he(),n=he(),[a,o,r,l,i,c,d,,u,h,f]=xe(e,he,(e=>k(e)?s:J(e)?P(e,C):C(e))),[g,L,w]=Qe((()=>T)),S=(t,s,n)=>{const a=i(t);de(n,((t,n)=>s(n,(s=>de(t,(t=>s(t,(s=>e.forEachCell(a,t,s)))))))))},T={setIndexDefinition:(e,s,a,o,r,l=Ne)=>{const i=k(r)?void 0:([e],[t])=>r(e,t);return u(e,s,((s,a,r,u,h,f)=>{let g=0;const w=ke(),S=ke(),T=c(e);if(de(a,(([e,t],s)=>{const n=ke(e),a=ke(t);de(n,(e=>ue(a,e)?ue(n,e):0)),de(n,(e=>{Me(w,e),M(ge(T,e),(t=>{ue(t,s),le(t)&&(we(T,e),g=1)}))})),de(a,(e=>{Me(w,e),re(T,e)||(we(T,e,ke()),g=1),Me(ge(T,e),s),k(o)||Me(S,e)}))})),s(),le(h)||(f?Le(T,(e=>Me(S,e))):Le(r,(e=>M(ge(u,e),(e=>Me(S,e))))),de(S,(e=>{const t=(t,s)=>l(ge(h,t),ge(h,s),e),s=[...ge(T,e)];N(s,t)||(we(T,e,ke(j(s,t))),Me(w,e))}))),(g||f)&&!k(i)){const t=[...T];N(t,i)||(d(e,he(j(t,i))),g=1)}g&&L(t,[e]),de(w,(t=>L(n,[e,t])))}),De(a),M(o,De)),T},delIndexDefinition:e=>(h(e),T),getStore:a,getIndexIds:o,forEachIndex:e=>r(((t,s)=>e(t,(e=>S(t,e,s))))),forEachSlice:(e,t)=>S(e,t,c(e)),hasIndex:l,hasSlice:(e,t)=>re(c(e),t),getTableId:i,getSliceIds:e=>fe(c(e)),getSliceRowIds:(e,t)=>ie(ge(c(e),t)),addSliceIdsListener:(e,s)=>g(s,t,[e]),addSliceRowIdsListener:(e,t,s)=>g(s,n,[e,t]),delListener:e=>(w(e),T),destroy:f,getListenerStats:()=>({})};return _(T)})),Oe=he([["avg",[(e,t)=>B(e)/t,(e,t,s)=>e+(t-e)/(s+1),(e,t,s)=>e+(e-t)/(s-1),(e,t,s,n)=>e+(t-s)/n]],["max",[e=>b(...e),(e,t)=>b(t,e),(e,t)=>t==e?void 0:e,(e,t,s)=>s==e?void 0:b(t,e)]],["min",[e=>V(...e),(e,t)=>V(t,e),(e,t)=>t==e?void 0:e,(e,t,s)=>s==e?void 0:V(t,e)]],["sum",[e=>B(e),(e,t)=>e+t,(e,t)=>e-t,(e,t,s)=>e-s+t]]]),Pe=(e,t,s,n,a,o=!1)=>{if(le(s))return;const[r,l,i,c]=a;return o||=k(e),de(n,(([s,n])=>{o||(e=k(s)?l?.(e,n,t++):k(n)?i?.(e,s,t--):c?.(e,n,s,t),o||=k(e))})),o?r(ie(s),oe(s)):e},Be=Je((e=>{const t=he(),[n,a,o,r,l,i,c,,d,u,h]=xe(e,A,(e=>isNaN(e)||k(e)||!0===e||!1===e||e===s?void 0:1*e)),[f,g,L]=Qe((()=>w)),w={setMetricDefinition:(e,s,n,a,o,r,l)=>{const u=D(n)?[n,o,r,l]:ge(Oe,n)??ge(Oe,"sum");return d(e,s,((s,n,a,o,r,l)=>{const d=i(e),h=oe(o);l||=k(d),s();let f=Pe(d,h,o,n,u,l);m(f)||(f=void 0),f!=d&&(c(e,f),g(t,[e],f,d))}),De(a,1)),w},delMetricDefinition:e=>(u(e),w),getStore:n,getMetricIds:a,forEachMetric:o,hasMetric:r,getTableId:l,getMetric:i,addMetricListener:(e,s)=>f(s,t,[e]),delListener:e=>(L(e),w),destroy:h,getListenerStats:()=>({})};return _(w)})),We=Je((e=>{const t=e.createStore,[n,a,o,r,l,,,i,,h,g,L,y]=xe(e,(()=>!0),A),I=t(),p=t(),C=he(),b=(e,t,...s)=>O(s,(s=>Me(Se(Se(C,t,he),e,ke),s))),V=e=>{M(ge(C,e),(e=>{Le(e,((e,t)=>de(t,(t=>e.delListener(t))))),ce(e)})),O([p,I],(t=>t.delTable(e)))},m=(e,t,s)=>b(t,e,t.addStartTransactionListener(s.startTransaction),t.addDidFinishTransactionListener((()=>s.finishTransaction()))),E={setQueryDefinition:(t,n,a)=>{i(t,n),V(t);const o=[],r=[[null,[n,null,null,[],he()]]],l=[],c=[],d=[];a({select:(e,t)=>{const n=D(e)?[W(o)+s,e]:[k(t)?e:t,s=>s(e,t)];return H(o,n),{as:e=>n[0]=e}},join:(e,t,s)=>{const n=k(s)||D(t)?null:t,a=k(n)?t:s,o=[e,[e,n,D(a)?a:e=>e(a),[],he()]];return H(r,o),{as:e=>o[0]=e}},where:(e,t,s)=>H(l,D(e)?e:k(s)?s=>s(e)===t:n=>n(e,t)===s),group:(e,t,s,n,a)=>{const o=[e,[e,D(t)?[t,s,n,a]:ge(Oe,t)??[(e,t)=>t]]];return H(c,o),{as:e=>o[0]=e}},having:(e,t)=>H(d,D(e)?e:s=>s(e)===t)});const u=he(o);if(le(u))return E;const h=he(r);Le(h,((e,[,t])=>M(ge(h,t),(({3:t})=>k(e)?0:H(t,e)))));const f=he(c);let g=I;if(le(f)&&$(d))g=p;else{m(t,g,p);const e=he();Le(f,((t,[s,n])=>Me(Se(e,s,ke),[t,n])));const s=ke();Le(u,(t=>re(e,t)?0:Me(s,t)));const n=he(),a=(s,n,a,o)=>M(s,(([r,l,i,c])=>{Le(n,((t,[s])=>{const n=Se(r,t,he),l=ge(n,a),i=o?void 0:s;if(l!==i){const s=ke([[l,i]]),o=oe(n);we(n,a,i),de(ge(e,t),(([e,t])=>{const a=Pe(c[e],o,n,s,t);c[e]=k(Ve(a))?null:a}))}})),le(l)||!Q(d,(e=>e((e=>c[e]))))?p.delRow(t,i):k(i)?s[2]=p.addRow(t,c):p.setRow(t,i,c)}));b(g,t,g.addRowListener(t,null,((o,r,l,i)=>{const c=[],d=[],u=he(),h=g.hasRow(t,l);let f=!h;de(s,(e=>{const[s,n,a]=i(t,l,e);H(c,n),H(d,a),f||=s})),Le(e,(e=>{const[s,,n]=i(t,l,e);(f||s)&&we(u,e,[n])})),f&&a(be(n,c,void 0,(([,e])=>(ue(e,l),le(e)))),u,l,1),h&&a(be(n,d,(()=>{const e={};return de(s,(s=>e[s]=g.getCell(t,l,s))),[he(),ke(),void 0,e]}),(([,e])=>{Me(e,l)})),u,l)})))}m(t,e,g);const w=(s,a,o,r)=>{const i=t=>e.getCell(a,o,t);O(r,(n=>{const[a,,o,r,l]=ge(h,n),c=o?.(i,s),[d,u]=ge(l,s)??[];c!=d&&(k(u)||y(t,u),we(l,s,k(c)?null:[c,...L(t,1,e.addRowListener(a,c,(()=>w(s,a,c,r))))]))})),(s=>{const a=(t,a)=>e.getCell(...k(a)?[n,s,t]:t===n?[n,s,a]:[ge(h,t)?.[0],ge(ge(h,t)?.[4],s)?.[0],a]);g.transaction((()=>Q(l,(e=>e(a)))?Le(u,((e,n)=>me(g,t,s,e,n(a,s)))):g.delRow(t,s)))})(s)},{3:S}=ge(h,null);return g.transaction((()=>L(t,1,e.addRowListener(n,null,((s,a,o)=>{e.hasRow(n,o)?w(o,n,o,S):(g.delRow(t,o),de(h,(({4:e})=>M(ge(e,o),(([,s])=>{y(t,s),we(e,o)})))))}))))),E},delQueryDefinition:e=>(V(e),h(e),E),getStore:n,getQueryIds:a,forEachQuery:o,hasQuery:r,getTableId:l,delListener:e=>(p.delListener(e),E),destroy:g,getListenerStats:()=>{const{tables:e,tableIds:t,transaction:s,...n}=p.getListenerStats();return n}};return ne({[f]:[1,1],[f+R]:[0,1],[S]:[0,1],[T]:[0,5],[w]:[1,2],[R]:[0,2],[v]:[1,3]},(([e,t],s)=>{O(e?["get","has","forEach"]:["get"],(e=>E[e+d+s]=(...t)=>p[e+s](...t))),E[u+d+s+c]=(...e)=>p[u+s+c](...G(e,0,t),((s,...n)=>e[t](E,...n)))})),_(E)})),$e=Je((e=>{const t=he(),n=he(),a=he(),o=he(),[r,l,i,c,d,u,,,h,f,g]=xe(e,(()=>[he(),he(),he(),he()]),(e=>k(e)?void 0:e+s)),[L,w,S]=Qe((()=>y)),T=(e,t,s)=>M(u(e),(([n,,a])=>{if(!re(a,t)){const o=ke();if(d(e)!=R(e))Me(o,t);else{let e=t;for(;!k(e)&&!re(o,e);)Me(o,e),e=ge(n,e)}if(s)return o;we(a,t,o)}return ge(a,t)})),v=(e,t)=>M(u(e),(([,,e])=>we(e,t))),R=e=>ge(t,e),y={setRelationshipDefinition:(e,s,r,l)=>(we(t,e,r),h(e,s,((t,s)=>{const r=ke(),l=ke(),i=ke(),[c,d]=u(e);de(s,(([t,s],n)=>{k(t)||(Me(l,t),M(ge(d,t),(e=>{ue(e,n),le(e)&&we(d,t)}))),k(s)||(Me(l,s),re(d,s)||we(d,s,ke()),Me(ge(d,s),n)),Me(r,n),we(c,n,s),Le(ge(o,e),(t=>{re(T(e,t),n)&&Me(i,t)}))})),t(),de(r,(t=>w(n,[e,t]))),de(l,(t=>w(a,[e,t]))),de(i,(t=>{v(e,t),w(o,[e,t])}))}),De(l)),y),delRelationshipDefinition:e=>(we(t,e),f(e),y),getStore:r,getRelationshipIds:l,forEachRelationship:t=>i((s=>t(s,(t=>e.forEachRow(d(s),t))))),hasRelationship:c,getLocalTableId:d,getRemoteTableId:R,getRemoteRowId:(e,t)=>ge(u(e)?.[0],t),getLocalRowIds:(e,t)=>ie(ge(u(e)?.[1],t)),getLinkedRowIds:(e,t)=>k(u(e))?[t]:ie(T(e,t,!0)),addRemoteRowIdListener:(e,t,s)=>L(s,n,[e,t]),addLocalRowIdsListener:(e,t,s)=>L(s,a,[e,t]),addLinkedRowIdsListener:(e,t,s)=>(T(e,t),L(s,o,[e,t])),delListener:e=>(v(...S(e)),y),destroy:g,getListenerStats:()=>({})};return _(y)})),qe=e=>[e,e],Ge=()=>[he(),he()],He=e=>[...e],Ke=([e,t])=>e===t,Ue=e=>JSON.stringify(e,((e,t)=>E(t,Map)?X.fromEntries([...t]):t)),Xe=JSON.parse,Ye=(e,t,s)=>k(e)||!ee(e)||ae(e)||Z(e)?(s?.(),!1):(ne(e,((s,n)=>{t(s,n)||se(e,n)})),!ae(e)),Ze=(e,t,s)=>we(e,t,ge(e,t)==-s?void 0:s),_e=()=>{let e,t,s=!1,n=!1,a=0;const r=he(),d=he(),h=he(),T=he(),b=he(),V=he(),m=he(),E=he(),J=he(),A=he(),Q=he(),N=he(),B=he(),W=ke(),$=he(),q=he(),K=he(),U=he(),X=Ge(),Y=Ge(),Z=Ge(),ee=Ge(),oe=Ge(),ie=Ge(),be=Ge(),xe=Ge(),De=Ge(),Je=Ge(),Ae=Ge(),ze=Ge(),je=Ge(),Oe=Ge(),Pe=he(),Be=Ge(),[We,$e,et,tt]=Qe((()=>gs)),st=e=>{if(!Ye(e,((e,t)=>F([l,i],t))))return!1;const t=e[l];return!(!x(t)&&t!=o||(Ve(e[i])!=t&&se(e,i),0))},nt=(t,s)=>(!e||re(A,s)||Jt(s))&&Ye(t,((e,t)=>at(s,t,e)),(()=>Jt(s))),at=(e,t,s,n)=>Ye(n?s:it(s,e,t),((n,a)=>M(ot(e,t,a,n),(e=>(s[a]=e,!0)),(()=>!1))),(()=>Jt(e,t))),ot=(t,s,n,a)=>e?M(ge(ge(A,t),n),(e=>Ve(a)!=e[l]?Jt(t,s,n,a,e[i]):a),(()=>Jt(t,s,n,a))):k(Ve(a))?Jt(t,s,n,a):a,rt=(e,t)=>Ye(t?e:ct(e),((t,s)=>M(lt(s,t),(t=>(e[s]=t,!0)),(()=>!1))),(()=>At())),lt=(e,s)=>t?M(ge(N,e),(t=>Ve(s)!=t[l]?At(e,s,t[i]):s),(()=>At(e,s))):k(Ve(s))?At(e,s):s,it=(e,t,s)=>(M(ge(Q,t),(([n,a])=>{de(n,((t,s)=>{te(e,s)||(e[s]=t)})),de(a,(n=>{te(e,n)||Jt(t,s,n)}))})),e),ct=e=>(t&&(de(B,((t,s)=>{te(e,s)||(e[s]=t)})),de(W,(t=>{te(e,t)||At(t)}))),e),dt=e=>Te(A,e,((e,t,s)=>{const n=he(),a=ke();Te(Se(A,t,he),s,((e,t,s)=>{we(e,t,s),M(s[i],(e=>we(n,t,e)),(()=>Me(a,t)))})),we(Q,t,[n,a])}),((e,t)=>{we(A,t),we(Q,t)})),ut=e=>Te(N,e,((e,t,s)=>{we(N,t,s),M(s[i],(e=>we(B,t,e)),(()=>Me(W,t)))}),((e,t)=>{we(N,t),we(B,t),ue(W,t)})),ht=e=>ae(e)?os():es(e),ft=e=>Te(K,e,((e,t,s)=>gt(t,s)),((e,t)=>pt(t))),gt=(e,t)=>Te(Se(K,e,(()=>(mt(e,1),we($,e,Fe()),we(q,e,he()),he()))),t,((t,s,n)=>Lt(e,t,s,n)),((t,s)=>Ct(e,t,s))),Lt=(e,t,s,n,a)=>Te(Se(t,s,(()=>(Et(e,s,1),he()))),n,((t,n,a)=>wt(e,s,t,n,a)),((n,o)=>bt(e,t,s,n,o,a))),wt=(e,t,s,n,a)=>{re(s,n)||kt(e,t,n,1);const o=ge(s,n);a!==o&&(Mt(e,t,n,o,a),we(s,n,a))},St=(e,t,s,n,a)=>M(ge(t,s),(t=>wt(e,s,t,n,a)),(()=>Lt(e,t,s,it({[n]:a},e,s)))),Tt=e=>ae(e)?is():ts(e),vt=e=>Te(U,e,((e,t,s)=>Rt(t,s)),((e,t)=>Vt(t))),Rt=(e,t)=>{re(U,e)||xt(e,1);const s=ge(U,e);t!==s&&(Dt(e,s,t),we(U,e,t))},yt=(e,t)=>{const[s]=ge($,e),n=s(t);return re(ge(K,e),n)?yt(e,t):n},It=e=>ge(K,e)??gt(e,{}),pt=e=>gt(e,{}),Ct=(e,t,s)=>{const[,n]=ge($,e);n(s),Lt(e,t,s,{},!0)},bt=(e,t,s,n,a,o)=>{const r=ge(ge(Q,e)?.[0],a);if(!k(r)&&!o)return wt(e,s,n,a,r);const l=t=>{Mt(e,s,t,ge(n,t)),kt(e,s,t,-1),we(n,t)};k(r)?l(a):Le(n,l),le(n)&&(Et(e,s,-1),le(we(t,s))&&(mt(e,-1),we(K,e),we($,e),we(q,e)))},Vt=e=>{const t=ge(B,e);if(!k(t))return Rt(e,t);Dt(e,ge(U,e)),xt(e,-1),we(U,e)},mt=(e,t)=>Ze(r,e,t),Et=(e,t,s)=>Ze(Se(h,e,he),t,s),kt=(e,t,s,n)=>{const a=ge(q,e),o=ge(a,s)??0;(0==o&&1==n||1==o&&-1==n)&&Ze(Se(d,e,he),s,n),we(a,s,o!=-n?o+n:null),Ze(Se(Se(T,e,he),t,he),s,n)},Mt=(e,t,s,n,a)=>Se(Se(Se(b,e,he),t,he),s,(()=>[n,0]))[1]=a,xt=(e,t)=>Ze(V,e,t),Dt=(e,t,s)=>Se(m,e,(()=>[t,0]))[1]=s,Jt=(e,t,s,n,a)=>(H(Se(Se(Se(E,e,he),t,he),s,(()=>[])),n),a),At=(e,t,s)=>(H(Se(J,e,(()=>[])),t),s),Ft=(e,t,s)=>M(ge(ge(ge(b,e),t),s),(([e,t])=>[!0,e,t]),(()=>[!1,...qe(Xt(e,t,s))])),Qt=e=>M(ge(m,e),(([e,t])=>[!0,e,t]),(()=>[!1,...qe(_t(e))])),zt=e=>le(E)||le(Je[e])?0:de(e?Ce(E):E,((t,s)=>de(t,((t,n)=>de(t,((t,a)=>$e(Je[e],[s,n,a],t))))))),Nt=e=>le(J)||le(Ae[e])?0:de(e?Ie(J):J,((t,s)=>$e(Ae[e],[s],t))),jt=(e,t,s)=>{if(!le(t))return $e(e,s,(()=>ve(t))),1},Ot=e=>{const t=le(ie[e]),s=le(xe[e])&&le(ee[e])&&le(oe[e])&&t&&le(Y[e]),n=le(De[e])&&le(be[e])&&le(Z[e])&&le(X[e]);if(!s||!n){const a=e?[Ie(r),pe(d),pe(h),Ce(T),Ce(b)]:[r,d,h,T,b];if(!s){jt(Y[e],a[0]),de(a[1],((t,s)=>jt(ee[e],t,[s])));const s=ke();de(a[2],((n,a)=>{jt(oe[e],n,[a])&&!t&&($e(ie[e],[a,null]),Me(s,a))})),t||de(a[4],((t,n)=>{if(!re(s,n)){const s=ke();de(t,(e=>de(e,(([t,n],a)=>n!==t?Me(s,a):ue(e,a))))),de(s,(t=>$e(ie[e],[n,t])))}})),de(a[3],((t,s)=>de(t,((t,n)=>jt(xe[e],t,[s,n])))))}if(!n){let t;de(a[4],((s,n)=>{let a;de(s,((s,o)=>{let r;de(s,(([s,l],i)=>{l!==s&&($e(De[e],[n,o,i],l,s,Ft),t=a=r=1)})),r&&$e(be[e],[n,o],Ft)})),a&&$e(Z[e],[n],Ft)})),t&&$e(X[e],void 0,Ft)}}},Pt=e=>{const t=le(je[e]),s=le(Oe[e])&&le(ze[e]);if(!t||!s){const n=e?[Ie(V),Ie(m)]:[V,m];if(t||jt(je[e],n[0]),!s){let t;de(n[1],(([s,n],a)=>{n!==s&&($e(Oe[e],[a],n,s,Qt),t=1)})),t&&$e(ze[e],void 0,Qt)}}},Bt=(e,...t)=>(us((()=>e(...P(t,C)))),gs),Wt=()=>[ve(b,((e,t)=>-1===ge(r,t)?null:ve(e,((e,s)=>-1===ge(ge(h,t),s)?null:ve(e,(([,e])=>e??null),((e,t)=>Ke(t)))),ae)),ae),ve(m,(([,e])=>e??null),((e,t)=>Ke(t)))],$t=()=>({cellsTouched:s,valuesTouched:n,changedCells:ye(b,He,Ke),invalidCells:ye(E),changedValues:ve(m,He,Ke),invalidValues:ve(J),changedTableIds:ve(r),changedRowIds:Re(h),changedCellIds:ye(T),changedValueIds:ve(V)}),qt=()=>ye(K),Gt=()=>fe(K),Ht=e=>fe(ge(K,C(e))),Kt=(e,t,s,n=0,a)=>{return P(G(j((o=ge(K,C(e)),r=(e,s)=>[k(t)?s:ge(e,C(t)),s],P([...o?.entries()??[]],(([e,t])=>r(t,e)))),(([e],[t])=>Ne(e,t)*(s?-1:1))),n,k(a)?a:n+a),(([,e])=>e));var o,r},Ut=(e,t)=>fe(ge(ge(K,C(e)),C(t))),Xt=(e,t,s)=>ge(ge(ge(K,C(e)),C(t)),C(s)),Yt=()=>ve(U),Zt=()=>fe(U),_t=e=>ge(U,C(e)),es=e=>Bt((()=>(e=>Ye(e,nt,Jt))(e)?ft(e):0)),ts=e=>Bt((()=>rt(e)?vt(e):0)),ss=e=>{try{ht(Xe(e))}catch{}return gs},ns=t=>Bt((()=>{if((e=Ye(t,(e=>Ye(e,st))))&&(dt(t),!le(K))){const e=qt();os(),es(e)}})),as=e=>Bt((()=>{if(t=(e=>Ye(e,st))(e)){const s=Yt();ds(),is(),t=!0,ut(e),ts(s)}})),os=()=>Bt((()=>ft({}))),rs=e=>Bt((e=>re(K,e)?pt(e):0),e),ls=(e,t)=>Bt(((e,t)=>M(ge(K,e),(s=>re(s,t)?Ct(e,s,t):0))),e,t),is=()=>Bt((()=>vt({}))),cs=()=>Bt((()=>{dt({}),e=!1})),ds=()=>Bt((()=>{ut({}),t=!1})),us=(e,t)=>{if(-1!=a){hs();const s=e();return fs(t),s}},hs=()=>(-1!=a&&a++,1==a&&$e(Pe,void 0,Wt,$t),gs),fs=e=>(a>0&&(a--,0==a&&(s=!le(b),n=!le(m),a=1,zt(1),s&&Ot(1),Nt(1),n&&Pt(1),e?.(Wt,$t)&&(de(b,((e,t)=>de(e,((e,s)=>de(e,(([e],n)=>me(gs,t,s,n,e))))))),de(m,(([e],t)=>Ee(gs,t,e))),s=n=!1),$e(Be[0],void 0,Wt,$t),a=-1,zt(0),s&&Ot(0),Nt(0),n&&Pt(0),$e(Be[1],void 0,Wt,$t),a=0,s=n=!1,O([r,d,h,T,b,E,V,m,J],ce))),gs),gs={getContent:()=>[qt(),Yt()],getTables:qt,getTableIds:Gt,getTable:e=>Re(ge(K,C(e))),getTableCellIds:e=>fe(ge(q,C(e))),getRowIds:Ht,getSortedRowIds:Kt,getRow:(e,t)=>ve(ge(ge(K,C(e)),C(t))),getCellIds:Ut,getCell:Xt,getValues:Yt,getValueIds:Zt,getValue:_t,hasTables:()=>!le(K),hasTable:e=>re(K,C(e)),hasTableCell:(e,t)=>re(ge(q,C(e)),C(t)),hasRow:(e,t)=>re(ge(K,C(e)),C(t)),hasCell:(e,t,s)=>re(ge(ge(K,C(e)),C(t)),C(s)),hasValues:()=>!le(U),hasValue:e=>re(U,C(e)),getTablesJson:()=>Ue(K),getValuesJson:()=>Ue(U),getJson:()=>Ue([K,U]),getTablesSchemaJson:()=>Ue(A),getValuesSchemaJson:()=>Ue(N),getSchemaJson:()=>Ue([A,N]),setContent:([e,t])=>Bt((()=>{(ae(e)?os:es)(e),(ae(t)?is:ts)(t)})),setTables:es,setTable:(e,t)=>Bt((e=>nt(t,e)?gt(e,t):0),e),setRow:(e,t,s)=>Bt(((e,t)=>at(e,t,s)?Lt(e,It(e),t,s):0),e,t),addRow:(e,t,s=!0)=>us((()=>{let n;return at(e,n,t)&&(e=C(e),Lt(e,It(e),n=yt(e,s?1:0),t)),n})),setPartialRow:(e,t,s)=>Bt(((e,t)=>{if(at(e,t,s,1)){const n=It(e);ne(s,((s,a)=>St(e,n,t,a,s)))}}),e,t),setCell:(e,t,s,n)=>Bt(((e,t,s)=>M(ot(e,t,s,D(n)?n(Xt(e,t,s)):n),(n=>St(e,It(e),t,s,n)))),e,t,s),setValues:ts,setPartialValues:e=>Bt((()=>rt(e,1)?ne(e,((e,t)=>Rt(t,e))):0)),setValue:(e,t)=>Bt((e=>M(lt(e,D(t)?t(_t(e)):t),(t=>Rt(e,t)))),e),setTransactionChanges:e=>Bt((()=>{ne(e[0],((e,t)=>k(e)?rs(t):ne(e,((e,s)=>k(e)?ls(t,s):ne(e,((e,n)=>me(gs,t,s,n,e))))))),ne(e[1],((e,t)=>Ee(gs,t,e)))})),setTablesJson:ss,setValuesJson:e=>{try{Tt(Xe(e))}catch{}return gs},setJson:e=>{try{const[t,s]=Xe(e);ht(t),Tt(s)}catch{ss(e)}return gs},setTablesSchema:ns,setValuesSchema:as,setSchema:(e,t)=>Bt((()=>{ns(e),as(t)})),delTables:os,delTable:rs,delRow:ls,delCell:(e,t,s,n)=>Bt(((e,t,s)=>M(ge(K,e),(a=>M(ge(a,t),(o=>re(o,s)?bt(e,a,t,o,s,n):0))))),e,t,s),delValues:is,delValue:e=>Bt((e=>re(U,e)?Vt(e):0),e),delTablesSchema:cs,delValuesSchema:ds,delSchema:()=>Bt((()=>{cs(),ds()})),transaction:us,startTransaction:hs,finishTransaction:fs,forEachTable:e=>de(K,((t,s)=>e(s,(e=>de(t,((t,s)=>e(s,(e=>Le(t,e))))))))),forEachTableCell:(e,t)=>Le(ge(q,C(e)),t),forEachRow:(e,t)=>de(ge(K,C(e)),((e,s)=>t(s,(t=>Le(e,t))))),forEachCell:(e,t,s)=>Le(ge(ge(K,C(e)),C(t)),s),forEachValue:e=>Le(U,e),addSortedRowIdsListener:(e,t,s,n,a,o,r)=>{let l=Kt(e,t,s,n,a);return We((()=>{const r=Kt(e,t,s,n,a);z(r,l)||(l=r,o(gs,e,t,s,n,a,l))}),ie[r?1:0],[e,t],[Gt])},addStartTransactionListener:e=>We(e,Pe),addWillFinishTransactionListener:e=>We(e,Be[0]),addDidFinishTransactionListener:e=>We(e,Be[1]),callListener:e=>(tt(e),gs),delListener:e=>(et(e),gs),getListenerStats:()=>({}),createStore:_e};return ne({[g]:[0,X],[L]:[0,Y],[f]:[1,Z,[Gt]],[f+R]:[1,ee,[Gt]],[S]:[1,oe,[Gt]],[w]:[2,be,[Gt,Ht]],[R]:[2,xe,[Gt,Ht]],[v]:[3,De,[Gt,Ht,Ut],e=>qe(Xt(...e))],InvalidCell:[3,Je],[I]:[0,ze],[p]:[0,je],[y]:[1,Oe,[Zt],e=>qe(_t(e[0]))],InvalidValue:[1,Ae]},(([e,t,s,n],a)=>{gs[u+a+c]=(...a)=>We(a[e],t[a[e+1]?1:0],e>0?G(a,0,e):void 0,s,n)})),_(gs)};e.createCheckpoints=ze,e.createCustomPersister=(e,t,s,n,a)=>{let o,r,l,i=0,c=0,d=0;const u=[],h=async e=>(2!=i&&(i=1,await f.schedule((async()=>{await e(),i=0}))),f),f={load:async(s,n)=>await h((async()=>{try{e.setContent(await t())}catch{e.setContent([s,n])}})),startAutoLoad:async(s={},a={})=>(f.stopAutoLoad(),await f.load(s,a),d=1,l=n((async(s,n)=>await h((async()=>{if(n)e.setTransactionChanges(n());else try{e.setContent(s?.()??await t())}catch{}})))),f),stopAutoLoad:()=>(d&&(a(l),l=void 0,d=0),f),save:async t=>(1!=i&&(i=2,await f.schedule((async()=>{try{await s(e.getContent,t)}catch{}i=0}))),f),startAutoSave:async()=>(await f.stopAutoSave().save(),o=e.addDidFinishTransactionListener(((e,t)=>{const[s,n]=t();ae(s)&&ae(n)||f.save((()=>[s,n]))})),f),stopAutoSave:()=>(M(o,e.delListener),f),schedule:async(...e)=>(H(u,...e),await(async()=>{if(!c){for(c=1;!k(r=U(u));)try{await r()}catch{}c=0}})(),f),getStore:()=>e,destroy:()=>f.stopAutoLoad().stopAutoSave(),getStats:()=>({})};return _(f)},e.createIndexes=je,e.createMetrics=Be,e.createQueries=We,e.createRelationships=$e,e.createStore=_e,e.defaultSorter=Ne},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TinyBase={});
