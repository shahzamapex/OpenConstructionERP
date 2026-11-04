import{e4 as y,bf as $,e5 as x}from"./index-ACXICuXA.js";import"./vendor-react-CubDQ7e2.js";const m=[{key:"area_m2",label:"Area",unit:"m2",aliases:["area_m2","area","NetArea","GrossArea","net_area","gross_area"]},{key:"volume_m3",label:"Volume",unit:"m3",aliases:["volume_m3","volume","NetVolume","GrossVolume","net_volume","gross_volume"]},{key:"length_m",label:"Length",unit:"m",aliases:["length_m","length","Length"]},{key:"weight_kg",label:"Weight",unit:"kg",aliases:["weight_kg","weight","Weight","mass","Mass"]}],k="Unclassified",h="Unassigned";function q(t,a){if(!t)return 0;for(const i of a)if(i in t){const n=t[i];if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"){const u=Number(n.trim());if(Number.isFinite(u))return u}}return 0}function _(t,a){return a==="storey"?t.storey&&t.storey.trim()||h:a==="discipline"?t.discipline&&t.discipline.trim()||h:t.element_type&&t.element_type.trim()||k}function b(t){return Math.round((t+Number.EPSILON)*1e3)/1e3}function L(t,a){const i=new Map,n={count:0,quantities:m.map(()=>0)};for(const l of t){const e=_(l,a);let o=i.get(e);o||(o={count:0,quantities:m.map(()=>0)},i.set(e,o)),o.count+=1,n.count+=1;const r=l.quantities;m.forEach((f,c)=>{const g=q(r,f.aliases);o.quantities[c]=(o.quantities[c]??0)+g,n.quantities[c]=(n.quantities[c]??0)+g})}const u=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),p=Array.from(i.entries()).map(([l,e])=>({key:l,count:e.count,quantities:e.quantities.map(b)})).sort((l,e)=>u.compare(l.key,e.key));return{groupBy:a,rows:p,totals:{count:n.count,quantities:n.quantities.map(b)}}}function s(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function d(t){return t.toLocaleString($(),{maximumFractionDigits:3})}function v(t,a,i){const n=(e,o)=>{var r;return x(e,((r=m[o])==null?void 0:r.unit)??"",i).value},u=m.map((e,o)=>{var r;return`<th class="num">${s(((r=a.quantities)==null?void 0:r[o])??`${e.label} (${y(e.unit,i)})`)}</th>`}).join(""),p=t.summary.rows.map(e=>{const o=e.quantities.map((r,f)=>`<td class="num">${d(n(r,f))}</td>`).join("");return`<tr><td>${s(e.key)}</td><td class="num">${d(e.count)}</td>${o}</tr>`}).join(""),l=t.summary.totals.quantities.map((e,o)=>`<td class="num">${d(n(e,o))}</td>`).join("");return`
    <h2>${s(t.heading)}</h2>
    <table>
      <thead>
        <tr><th>${s(t.groupLabel)}</th><th class="num">${s(a.count??"Count")}</th>${u}</tr>
      </thead>
      <tbody>${p}</tbody>
      <tfoot>
        <tr><td>${s(a.total??"TOTAL")}</td><td class="num">${d(t.summary.totals.count)}</td>${l}</tr>
      </tfoot>
    </table>`}function I(t){const a=t.labels??{},i=t.system??"metric",n=t.sections.map(u=>v(u,a,i)).join(`
`);return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${s(t.title)}</title>
<style>
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111; margin: 32px; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  .meta { color: #666; font-size: 12px; margin: 0 0 20px; }
  h2 { font-size: 14px; margin: 24px 0 6px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; margin-bottom: 8px; }
  th, td { border: 1px solid #ddd; padding: 5px 8px; text-align: left; }
  th { background: #f3f4f6; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  tfoot td { font-weight: 700; background: #f9fafb; }
  .brand { margin-top: 28px; color: #9ca3af; font-size: 10px; }
  @media print { body { margin: 12mm; } }
</style>
</head>
<body>
  <h1>${s(t.title)}</h1>
  <p class="meta">${s(t.scopeLabel)} &middot; ${s(t.generatedOn)}</p>
  ${n}
  <p class="brand">OpenConstructionERP</p>
</body>
</html>`}export{m as Q,I as b,s as e,L as s};
