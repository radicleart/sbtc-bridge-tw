<script>
	import logoWhite from '$lib/assets/Stacks Logo White.png';
</script>

<div class="footer">
  <div class="wrapper">
    <div class="container">
      <div class="frame1">
        <div class="logo"><img width="100px" height="40px" class="nav-logo" src={logoWhite} alt="sBTC Bridge" /></div>
        <div class="copyright hidden md:flex">Copyright -- Stacks Foundation -- 2023</div>
      </div>
      <div class="social-icons">
        <a href="https://discord.com/channels/621759717756370964/971037457661444156" target="_blank" class="github">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </a>
        <a href="https://mobile.twitter.com/stacks" target="_blank" class="discord">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
        </a>    
      </div>
    </div>
  </div>
</div>

<style>
.footer {
	/* Footer */


	/* Auto layout */

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	padding: 32px 215px;

	width: 100%;
	height: 148px;


	/* Inside auto layout */

	flex: none;
	order: 3;
	flex-grow: 0;
	z-index: 3;
}
.wrapper {
  /* Wrapper */


  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: 84px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.container {
  /* Container */


  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 64px;

  width: 100%;
  height: 32px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.frame1 {
  /* Frame 28453 */


  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;

  width: auto;
  height: 24px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.social-icons {
  /* Social Icons */


  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 88px;
  height: 32px;


  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}
.logo {
  width: 123.35px;
  height: 24px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.copyright {
  /* Copyright — Stacks Foundation — 2023 */


  width: 293px;
  height: 14px;

  /* base/Medium */

  font-family: 'Circular Std';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  text-align: center;

  /* Gray/200 */

  color: #DCDEE7;


  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}
.github {
  /* github */


  width: 32px;
  height: 32px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.discord {
  /* twitter */


  width: 32px;
  height: 32px;


  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>