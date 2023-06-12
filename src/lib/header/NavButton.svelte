<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let label:string;
  export let target:string;

  let btnId="btn-" + target;

  const dispatch = createEventDispatcher();

  const doClicked = (event:any) => {
    const menuTarget = { offsetTop: event.target.offsetTop, offsetLeft: event.target.offsetLeft };
    dispatch('clicked', { action: target, menuTarget });
  }
</script>


{#if target === 'settings'}
  <button id={btnId} class="bg-primary-02 p-px font-normal rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" on:keydown on:click={(event) => doClicked(event)}>
    <span class="inline-flex items-center gap-x-1.5 bg-gray-1000 px-4 py-2 rounded-xl">
      <span class="text-transparent bg-clip-text bg-primary-02">{label}</span>

      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.426 8.4428L10.1782 12.9405C10.1552 12.964 10.1277 12.9828 10.0973 12.9957C10.0664 13.0089 10.0331 13.0156 9.99953 13.0156C9.96593 13.0156 9.93266 13.0089 9.90174 12.9957C9.87138 12.9828 9.84389 12.964 9.82084 12.9405L5.57304 8.4428L5.57305 8.44278L5.56984 8.43945C5.5239 8.39169 5.49879 8.32765 5.50004 8.2614C5.50129 8.19515 5.5288 8.1321 5.57651 8.08611L5.22954 7.72611L5.57619 8.08642C5.62394 8.04048 5.68798 8.01537 5.75424 8.01662C5.8198 8.01786 5.88222 8.0448 5.92807 8.09159L9.6356 12.027L9.99953 12.4133L10.3635 12.027L14.0735 8.08897L14.0735 8.08903L14.0799 8.08203C14.1023 8.05725 14.1296 8.03724 14.1599 8.02317C14.1903 8.0091 14.2232 8.00127 14.2566 8.00014C14.29 7.99901 14.3234 8.00461 14.3546 8.01659C14.3858 8.02858 14.4143 8.04671 14.4384 8.06992C14.4626 8.09313 14.4817 8.12094 14.4949 8.1517C14.5081 8.18246 14.5149 8.21555 14.515 8.24901C14.5152 8.28247 14.5086 8.31561 14.4957 8.34648C14.4828 8.37734 14.4638 8.40531 14.4399 8.4287L14.4328 8.43561L14.426 8.4428Z" fill="white" stroke="url(#paint0_linear_3780_6393)"/>
        <defs>
        <linearGradient id="paint0_linear_3780_6393" x1="3.38889" y1="10.5078" x2="8.08358" y2="16.2123" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ED693C"/>
        <stop offset="0.9036" stop-color="#FEDB63"/>
        </linearGradient>
        </defs>
      </svg>
    </span>
  </button>
{:else if target === 'account'}
  <button id={btnId} class="inline-flex items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-xl border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" on:keydown on:click={(event) => doClicked(event)}>
    {label}
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.426 8.4428L10.1782 12.9405C10.1552 12.964 10.1277 12.9828 10.0973 12.9957C10.0664 13.0089 10.0331 13.0156 9.99953 13.0156C9.96593 13.0156 9.93266 13.0089 9.90174 12.9957C9.87138 12.9828 9.84389 12.964 9.82084 12.9405L5.57304 8.4428L5.57305 8.44278L5.56984 8.43945C5.5239 8.39169 5.49879 8.32765 5.50004 8.2614C5.50129 8.19515 5.5288 8.1321 5.57651 8.08611L5.22954 7.72611L5.57619 8.08642C5.62394 8.04048 5.68798 8.01537 5.75424 8.01662C5.8198 8.01786 5.88222 8.0448 5.92807 8.09159L9.6356 12.027L9.99953 12.4133L10.3635 12.027L14.0735 8.08897L14.0735 8.08903L14.0799 8.08203C14.1023 8.05725 14.1296 8.03724 14.1599 8.02317C14.1903 8.0091 14.2232 8.00127 14.2566 8.00014C14.29 7.99901 14.3234 8.00461 14.3546 8.01659C14.3858 8.02858 14.4143 8.04671 14.4384 8.06992C14.4626 8.09313 14.4817 8.12094 14.4949 8.1517C14.5081 8.18246 14.5149 8.21555 14.515 8.24901C14.5152 8.28247 14.5086 8.31561 14.4957 8.34648C14.4828 8.37734 14.4638 8.40531 14.4399 8.4287L14.4328 8.43561L14.426 8.4428Z" fill="white" stroke="black"/>
    </svg>
  </button>
{:else if target === 'connect'}
  <button id={btnId} class="inline-flex items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-xl border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" on:keydown on:click={(event) => doClicked(event)}>
    {label}
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_3780_6397" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
      <rect y="0.5" width="20" height="20" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_3780_6397)">
      <path d="M17.5 10.5C17.5 10.0027 17.3025 9.52581 16.9508 9.17417C16.5992 8.82254 16.1223 8.625 15.625 8.625H12.5C12.5 9.28804 12.2366 9.92393 11.7678 10.3928C11.2989 10.8616 10.663 11.125 10 11.125C9.33696 11.125 8.70107 10.8616 8.23223 10.3928C7.76339 9.92393 7.5 9.28804 7.5 8.625H4.375C3.87772 8.625 3.40081 8.82254 3.04917 9.17417C2.69754 9.52581 2.5 10.0027 2.5 10.5M17.5 10.5V15.5C17.5 15.9973 17.3025 16.4742 16.9508 16.8258C16.5992 17.1775 16.1223 17.375 15.625 17.375H4.375C3.87772 17.375 3.40081 17.1775 3.04917 16.8258C2.69754 16.4742 2.5 15.9973 2.5 15.5V10.5M17.5 10.5V8M2.5 10.5V8M17.5 8C17.5 7.50272 17.3025 7.02581 16.9508 6.67417C16.5992 6.32254 16.1223 6.125 15.625 6.125H4.375C3.87772 6.125 3.40081 6.32254 3.04917 6.67417C2.69754 7.02581 2.5 7.50272 2.5 8M17.5 8V5.5C17.5 5.00272 17.3025 4.52581 16.9508 4.17417C16.5992 3.82254 16.1223 3.625 15.625 3.625H4.375C3.87772 3.625 3.40081 3.82254 3.04917 4.17417C2.69754 4.52581 2.5 5.00272 2.5 5.5V8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </button>
{/if}
