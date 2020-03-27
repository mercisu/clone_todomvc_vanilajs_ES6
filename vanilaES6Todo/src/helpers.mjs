
/*
&amp, &lt와 같은 특수문자를 HTML Entity 엔티티라고 부른다.
<div> < menu</div> menu 앞특수 문자를 표현하기 위한것
&문자를 Html &amp로 변환하는 행위를 Escape(이스케이프) 한다고 함.
 */
export const escapeForHTML = s => s.replace(/&</g, c => c ==='&'?'&amp;' : '&lt;');