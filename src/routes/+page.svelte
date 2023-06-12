<script lang="ts">
  import { Icon, ArrowSmallRight } from "svelte-hero-icons"
</script>

<div class="mx-auto max-w-2xl">
  <div class="flex flex-col p-10 gap-10 items-start bg-gray-1000 border-[0.5px] border-gray-700 rounded-3xl">
    <div class="flex flex-col gap-10">
      <h1 class="text-4xl font-normal">Welcome!</h1>
      <div class="flex flex-col gap-5">
        <p>
          This is the <span class="font-normal">official</span> sBTC Bridge developed by the Stacks community.
        </p>
        <p>
          In order to interact with this application, you will need to have a wallet that supports both BTC and STX. <a class="text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50 hover:underline" href="/wallet">Don't have a wallet?</a>
        </p>
        <p>
          Please note that Lightning network is not supported at the moment.
        </p>
        <p class="">For more info about the sBTC Brigde, check <a class="text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50 hover:underline decoration-primary-500/80" href="/faq">the FAQ page.</a></p>
      </div>
      <div>
        <a href="/start" class="inline-flex items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-xl border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" role="button">
          Launch app
          <Icon src="{ArrowSmallRight}" mini class="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
</div>
