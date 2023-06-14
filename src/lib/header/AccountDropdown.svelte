<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte'
	import { Icon, ClipboardDocument } from "svelte-hero-icons"

	import { createEventDispatcher } from "svelte";
	import { truncate } from '$lib/utils'
	import { sbtcConfig } from '$stores/stores'
	import { fmtSatoshiToBitcoin, fmtMicroToStx, bitcoinBalanceFromMempool } from '$lib/utils'
	import { addresses, logUserOut } from '$lib/stacks_connect'
	import type { SbtcConfig } from '$types/sbtc_config';
	const dispatch = createEventDispatcher();

	const doLogout = () => {
		logUserOut();
		sbtcConfig.update((conf:SbtcConfig) => {
			conf.loggedIn = false;
			conf.addressObject = undefined;
			conf.pegInTransaction = undefined;
			conf.pegOutTransaction = undefined;
			return conf;
		});
		dispatch('init_logout');
	}

	const transformAddress = (address:string) => {
		if (address) {
			return truncate(address, 8).toUpperCase()
		}
		return 'not connected'
	}
</script>


<Button btnClass="inline-flex items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-xl border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50">
	My account
	<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.426 8.4428L10.1782 12.9405C10.1552 12.964 10.1277 12.9828 10.0973 12.9957C10.0664 13.0089 10.0331 13.0156 9.99953 13.0156C9.96593 13.0156 9.93266 13.0089 9.90174 12.9957C9.87138 12.9828 9.84389 12.964 9.82084 12.9405L5.57304 8.4428L5.57305 8.44278L5.56984 8.43945C5.5239 8.39169 5.49879 8.32765 5.50004 8.2614C5.50129 8.19515 5.5288 8.1321 5.57651 8.08611L5.22954 7.72611L5.57619 8.08642C5.62394 8.04048 5.68798 8.01537 5.75424 8.01662C5.8198 8.01786 5.88222 8.0448 5.92807 8.09159L9.6356 12.027L9.99953 12.4133L10.3635 12.027L14.0735 8.08897L14.0735 8.08903L14.0799 8.08203C14.1023 8.05725 14.1296 8.03724 14.1599 8.02317C14.1903 8.0091 14.2232 8.00127 14.2566 8.00014C14.29 7.99901 14.3234 8.00461 14.3546 8.01659C14.3858 8.02858 14.4143 8.04671 14.4384 8.06992C14.4626 8.09313 14.4817 8.12094 14.4949 8.1517C14.5081 8.18246 14.5149 8.21555 14.515 8.24901C14.5152 8.28247 14.5086 8.31561 14.4957 8.34648C14.4828 8.37734 14.4638 8.40531 14.4399 8.4287L14.4328 8.43561L14.426 8.4428Z" fill="white" stroke="black"/>
	</svg>
</Button>
<Dropdown
	frameClass="rounded-lg !bg-black !border py-2 !border-gray-900"
	ulClass="py-1 w-full"
	placement='bottom-end'
>
	<div slot="header" class="bg-gray-1000 overflow-hidden py-1">
		<div class="divide-y divide-gray-900">
			<div>
				<div class="px-4 py-2 font-normal">Addresses</div>
				<div class="px-4 py-1 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-6 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path fill="#5546FF" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"/>
							<path fill="#fff" d="m14.346 15.333-2.263-3.429h3.25v-1.293H4.667v1.295h3.248l-2.262 3.427h1.688L10 11.305l2.659 4.028h1.687Zm.987-5.978V8.048h-3.184l2.232-3.381h-1.688L10 8.747l-2.694-4.08H5.618l2.236 3.385H4.665v1.303h10.667Z"/>
						</svg>
						<span>{transformAddress(addresses().stxAddress)}</span>
					</div>
					<div class="ml-auto flex items-center">
						<button class="h-8 w-8 rounded-md bg-black flex items-center justify-center border border-transparent hover:border-gray-900 transition duration-200">
							<Icon src="{ClipboardDocument}" class="-mr-0.5 h-5 w-5 text-white" aria-hidden="true" />
						</button>
					</div>
				</div>
				<div class="px-4 py-1 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-6 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.7001 12.4198C19.3824 13.6937 18.8168 14.8925 18.0358 15.9477C17.2547 17.003 16.2734 17.8941 15.148 18.5702C14.0225 19.2462 12.7749 19.6939 11.4764 19.8877C10.1779 20.0815 8.85393 20.0177 7.5801 19.6998C5.66184 19.2211 3.92859 18.1843 2.59955 16.7206C1.2705 15.2568 0.405334 13.4318 0.113452 11.4764C-0.178429 9.52096 0.116081 7.52289 0.959742 5.73483C1.8034 3.94677 3.15832 2.44903 4.85318 1.431C6.54803 0.412971 8.5067 -0.0796316 10.4815 0.0154847C12.4563 0.110601 14.3586 0.789164 15.9477 1.96537C17.5369 3.14157 18.7416 4.7626 19.4095 6.62346C20.0774 8.48432 20.1786 10.5015 19.7001 12.4198Z" fill="#F7931A"/>
							<path d="M14.41 8.57486C14.61 7.24486 13.595 6.52986 12.21 6.05153L12.66 4.24986L11.5617 3.97653L11.1234 5.73153C10.835 5.65986 10.54 5.59153 10.245 5.52486L10.685 3.7582L9.58837 3.48486L9.14003 5.28486L6.9267 4.7382L6.63503 5.90986C6.63503 5.90986 7.44837 6.09653 7.4317 6.1082C7.8767 6.21986 7.9567 6.5132 7.94337 6.74653L6.7117 11.6832C6.6567 11.8165 6.52003 12.0199 6.20837 11.9432C6.22003 11.9599 5.4117 11.7432 5.4117 11.7432L4.8667 12.9999L7.0767 13.5582L6.6217 15.3815L7.71837 15.6549L8.16837 13.8515C8.46837 13.9332 8.75837 14.0082 9.04337 14.0782L8.59337 15.8732L9.6917 16.1465L10.1467 14.3265C12.0167 14.6832 13.425 14.5399 14.0167 12.8499C14.4934 11.4882 13.9934 10.7015 13.0084 10.1899C13.725 10.0232 14.265 9.55153 14.4084 8.5782H14.41V8.57486ZM11.9017 12.0915C11.5617 13.4532 9.26837 12.7165 8.52503 12.5315L9.1267 10.1165C9.87003 10.3015 12.255 10.6699 11.9017 12.0915ZM12.2417 8.55653C11.9334 9.79653 10.0234 9.16653 9.40337 9.01153L9.94837 6.81986C10.5684 6.97486 12.565 7.2632 12.2417 8.55653Z" fill="white"/>
						</svg>

						<span><span class="font-bold">Cardinal:</span>{' '}{transformAddress(addresses().cardinal)}</span>
					</div>
					<div class="ml-auto flex items-center">
						<button class="h-8 w-8 rounded-md bg-black flex items-center justify-center border border-transparent hover:border-gray-900 transition duration-200">
							<Icon src="{ClipboardDocument}" class="-mr-0.5 h-5 w-5 text-white" aria-hidden="true" />
						</button>
					</div>
				</div>
				<div class="px-4 py-1 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-6 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.7001 12.4198C19.3824 13.6937 18.8168 14.8925 18.0358 15.9477C17.2547 17.003 16.2734 17.8941 15.148 18.5702C14.0225 19.2462 12.7749 19.6939 11.4764 19.8877C10.1779 20.0815 8.85393 20.0177 7.5801 19.6998C5.66184 19.2211 3.92859 18.1843 2.59955 16.7206C1.2705 15.2568 0.405334 13.4318 0.113452 11.4764C-0.178429 9.52096 0.116081 7.52289 0.959742 5.73483C1.8034 3.94677 3.15832 2.44903 4.85318 1.431C6.54803 0.412971 8.5067 -0.0796316 10.4815 0.0154847C12.4563 0.110601 14.3586 0.789164 15.9477 1.96537C17.5369 3.14157 18.7416 4.7626 19.4095 6.62346C20.0774 8.48432 20.1786 10.5015 19.7001 12.4198Z" fill="#F7931A"/>
							<path d="M14.41 8.57486C14.61 7.24486 13.595 6.52986 12.21 6.05153L12.66 4.24986L11.5617 3.97653L11.1234 5.73153C10.835 5.65986 10.54 5.59153 10.245 5.52486L10.685 3.7582L9.58837 3.48486L9.14003 5.28486L6.9267 4.7382L6.63503 5.90986C6.63503 5.90986 7.44837 6.09653 7.4317 6.1082C7.8767 6.21986 7.9567 6.5132 7.94337 6.74653L6.7117 11.6832C6.6567 11.8165 6.52003 12.0199 6.20837 11.9432C6.22003 11.9599 5.4117 11.7432 5.4117 11.7432L4.8667 12.9999L7.0767 13.5582L6.6217 15.3815L7.71837 15.6549L8.16837 13.8515C8.46837 13.9332 8.75837 14.0082 9.04337 14.0782L8.59337 15.8732L9.6917 16.1465L10.1467 14.3265C12.0167 14.6832 13.425 14.5399 14.0167 12.8499C14.4934 11.4882 13.9934 10.7015 13.0084 10.1899C13.725 10.0232 14.265 9.55153 14.4084 8.5782H14.41V8.57486ZM11.9017 12.0915C11.5617 13.4532 9.26837 12.7165 8.52503 12.5315L9.1267 10.1165C9.87003 10.3015 12.255 10.6699 11.9017 12.0915ZM12.2417 8.55653C11.9334 9.79653 10.0234 9.16653 9.40337 9.01153L9.94837 6.81986C10.5684 6.97486 12.565 7.2632 12.2417 8.55653Z" fill="white"/>
						</svg>

						<span><span class="font-bold">Ordinal:</span>{' '}{transformAddress(addresses().ordinal)}</span>
					</div>
					<div class="ml-auto flex items-center">
						<button class="h-8 w-8 rounded-md bg-black flex items-center justify-center border border-transparent hover:border-gray-900 transition duration-200">
							<Icon src="{ClipboardDocument}" class="-mr-0.5 h-5 w-5 text-white" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
			<div>
				<div class="mt-1 px-4 py-2 font-normal">Balances</div>
				<div class="px-4 py-2 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-4 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path fill="#5546FF" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"/>
							<path fill="#fff" d="m14.346 15.333-2.263-3.429h3.25v-1.293H4.667v1.295h3.248l-2.262 3.427h1.688L10 11.305l2.659 4.028h1.687Zm.987-5.978V8.048h-3.184l2.232-3.381h-1.688L10 8.747l-2.694-4.08H5.618l2.236 3.385H4.665v1.303h10.667Z"/>
						</svg>
						<span class="font-bold">STX</span>
					</div>
					<div class="ml-auto flex items-center">
						{fmtMicroToStx($sbtcConfig?.addressObject?.stacksTokenInfo.stx.balance || 0.000000)}
					</div>
				</div>

				<div class="px-4 py-2 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-4 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.7001 12.4198C19.3824 13.6937 18.8168 14.8925 18.0358 15.9477C17.2547 17.003 16.2734 17.8941 15.148 18.5702C14.0225 19.2462 12.7749 19.6939 11.4764 19.8877C10.1779 20.0815 8.85393 20.0177 7.5801 19.6998C5.66184 19.2211 3.92859 18.1843 2.59955 16.7206C1.2705 15.2568 0.405334 13.4318 0.113452 11.4764C-0.178429 9.52096 0.116081 7.52289 0.959742 5.73483C1.8034 3.94677 3.15832 2.44903 4.85318 1.431C6.54803 0.412971 8.5067 -0.0796316 10.4815 0.0154847C12.4563 0.110601 14.3586 0.789164 15.9477 1.96537C17.5369 3.14157 18.7416 4.7626 19.4095 6.62346C20.0774 8.48432 20.1786 10.5015 19.7001 12.4198Z" fill="#F7931A"/>
							<path d="M14.41 8.57486C14.61 7.24486 13.595 6.52986 12.21 6.05153L12.66 4.24986L11.5617 3.97653L11.1234 5.73153C10.835 5.65986 10.54 5.59153 10.245 5.52486L10.685 3.7582L9.58837 3.48486L9.14003 5.28486L6.9267 4.7382L6.63503 5.90986C6.63503 5.90986 7.44837 6.09653 7.4317 6.1082C7.8767 6.21986 7.9567 6.5132 7.94337 6.74653L6.7117 11.6832C6.6567 11.8165 6.52003 12.0199 6.20837 11.9432C6.22003 11.9599 5.4117 11.7432 5.4117 11.7432L4.8667 12.9999L7.0767 13.5582L6.6217 15.3815L7.71837 15.6549L8.16837 13.8515C8.46837 13.9332 8.75837 14.0082 9.04337 14.0782L8.59337 15.8732L9.6917 16.1465L10.1467 14.3265C12.0167 14.6832 13.425 14.5399 14.0167 12.8499C14.4934 11.4882 13.9934 10.7015 13.0084 10.1899C13.725 10.0232 14.265 9.55153 14.4084 8.5782H14.41V8.57486ZM11.9017 12.0915C11.5617 13.4532 9.26837 12.7165 8.52503 12.5315L9.1267 10.1165C9.87003 10.3015 12.255 10.6699 11.9017 12.0915ZM12.2417 8.55653C11.9334 9.79653 10.0234 9.16653 9.40337 9.01153L9.94837 6.81986C10.5684 6.97486 12.565 7.2632 12.2417 8.55653Z" fill="white"/>
						</svg>
						<span class="font-bold">BTC (Cardinal)</span>
					</div>
					<div class="ml-auto flex items-center">
						{fmtSatoshiToBitcoin(bitcoinBalanceFromMempool($sbtcConfig?.addressObject?.cardinalInfo) || 0.00000000)}
					</div>
				</div>
				<div class="px-4 py-2 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-4 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.7001 12.4198C19.3824 13.6937 18.8168 14.8925 18.0358 15.9477C17.2547 17.003 16.2734 17.8941 15.148 18.5702C14.0225 19.2462 12.7749 19.6939 11.4764 19.8877C10.1779 20.0815 8.85393 20.0177 7.5801 19.6998C5.66184 19.2211 3.92859 18.1843 2.59955 16.7206C1.2705 15.2568 0.405334 13.4318 0.113452 11.4764C-0.178429 9.52096 0.116081 7.52289 0.959742 5.73483C1.8034 3.94677 3.15832 2.44903 4.85318 1.431C6.54803 0.412971 8.5067 -0.0796316 10.4815 0.0154847C12.4563 0.110601 14.3586 0.789164 15.9477 1.96537C17.5369 3.14157 18.7416 4.7626 19.4095 6.62346C20.0774 8.48432 20.1786 10.5015 19.7001 12.4198Z" fill="#F7931A"/>
							<path d="M14.41 8.57486C14.61 7.24486 13.595 6.52986 12.21 6.05153L12.66 4.24986L11.5617 3.97653L11.1234 5.73153C10.835 5.65986 10.54 5.59153 10.245 5.52486L10.685 3.7582L9.58837 3.48486L9.14003 5.28486L6.9267 4.7382L6.63503 5.90986C6.63503 5.90986 7.44837 6.09653 7.4317 6.1082C7.8767 6.21986 7.9567 6.5132 7.94337 6.74653L6.7117 11.6832C6.6567 11.8165 6.52003 12.0199 6.20837 11.9432C6.22003 11.9599 5.4117 11.7432 5.4117 11.7432L4.8667 12.9999L7.0767 13.5582L6.6217 15.3815L7.71837 15.6549L8.16837 13.8515C8.46837 13.9332 8.75837 14.0082 9.04337 14.0782L8.59337 15.8732L9.6917 16.1465L10.1467 14.3265C12.0167 14.6832 13.425 14.5399 14.0167 12.8499C14.4934 11.4882 13.9934 10.7015 13.0084 10.1899C13.725 10.0232 14.265 9.55153 14.4084 8.5782H14.41V8.57486ZM11.9017 12.0915C11.5617 13.4532 9.26837 12.7165 8.52503 12.5315L9.1267 10.1165C9.87003 10.3015 12.255 10.6699 11.9017 12.0915ZM12.2417 8.55653C11.9334 9.79653 10.0234 9.16653 9.40337 9.01153L9.94837 6.81986C10.5684 6.97486 12.565 7.2632 12.2417 8.55653Z" fill="white"/>
						</svg>
						<span class="font-bold">BTC (Ordinal)</span>
					</div>
					<div class="ml-auto flex items-center">
						{fmtSatoshiToBitcoin(bitcoinBalanceFromMempool($sbtcConfig?.addressObject?.ordinalInfo) || 0.00000000)}
					</div>
				</div>
				<div class="px-4 py-2 bg-gray-1000 grid grid-flow-col auto-cols-auto gap-4 items-center">
					<div class="flex items-center gap-3 text-sm">
						<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<g clip-path="url(#a)">
								<path fill="#000" d="M17.522 19.863H2.489a2.296 2.296 0 0 1-2.29-2.29V2.531A2.296 2.296 0 0 1 2.49.242h15.04a2.296 2.296 0 0 1 2.29 2.289v15.042a2.31 2.31 0 0 1-2.299 2.29Z"/>
								<mask id="b" width="18" height="18" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance">
									<path fill="#fff" d="M.16.213h17.387V17.6H.16V.213Z"/>
								</mask>
								<g mask="url(#b)">
									<mask id="c" width="18" height="18" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance">
										<path fill="#fff" d="M8.421 6.303h3.04l6.061-6.06H2.489A2.296 2.296 0 0 0 .199 2.53v15.043l8.222-8.231v-3.04Z"/>
									</mask>
									<g mask="url(#c)">
										<path fill="url(#d)" d="M.2.242v17.332h17.322V.242H.2Z"/>
									</g>
								</g>
								<path fill="#fff" d="m3.166 6.349.266-.531c.036-.101.137-.12.229-.073 0 0 .448.238.897.238.201 0 .339-.083.339-.248 0-.174-.138-.283-.66-.494-.76-.293-1.117-.705-1.117-1.3 0-.604.45-1.163 1.456-1.163.586 0 1.007.165 1.218.302.091.055.137.165.091.266l-.247.503c-.046.092-.156.101-.238.074 0 0-.449-.211-.815-.211-.238 0-.338.1-.338.229 0 .174.174.238.54.384.76.293 1.336.623 1.336 1.392 0 .65-.576 1.209-1.565 1.209-.65 0-1.108-.211-1.31-.367-.082-.054-.128-.137-.082-.21ZM6.91 5.122c0-.146.12-.284.285-.284h3.415c1.776 0 3.14 1.19 3.14 2.756 0 1.145-.943 2.042-1.639 2.371.788.257 1.941 1.062 1.941 2.427 0 1.666-1.428 2.875-3.25 2.875H7.195a.285.285 0 0 1-.284-.284v-9.86Zm3.517 4.093c.76 0 1.281-.596 1.281-1.337 0-.742-.521-1.264-1.281-1.264H8.834v2.61h1.593v-.01Zm.21 4.294c.742 0 1.337-.577 1.337-1.355 0-.742-.742-1.3-1.52-1.3h-1.62v2.655h1.803Z"/>
							</g>
							<defs>
								<linearGradient id="d" x1=".2" x2="17.522" y1="8.905" y2="8.905" gradientUnits="userSpaceOnUse">
									<stop stop-color="#ED693C"/>
									<stop offset=".008" stop-color="#ED693C"/>
									<stop offset=".016" stop-color="#ED6A3B"/>
									<stop offset=".023" stop-color="#ED6B3B"/>
									<stop offset=".031" stop-color="#ED6C3A"/>
									<stop offset=".039" stop-color="#EE6D3A"/>
									<stop offset=".047" stop-color="#EE6D3A"/>
									<stop offset=".055" stop-color="#EE6E39"/>
									<stop offset=".063" stop-color="#EE6F39"/>
									<stop offset=".07" stop-color="#EE7038"/>
									<stop offset=".078" stop-color="#EE7138"/>
									<stop offset=".086" stop-color="#EE7237"/>
									<stop offset=".094" stop-color="#EE7237"/>
									<stop offset=".102" stop-color="#EF7337"/>
									<stop offset=".109" stop-color="#EF7436"/>
									<stop offset=".117" stop-color="#EF7536"/>
									<stop offset=".125" stop-color="#EF7635"/>
									<stop offset=".133" stop-color="#EF7635"/>
									<stop offset=".141" stop-color="#EF7735"/>
									<stop offset=".148" stop-color="#EF7834"/>
									<stop offset=".156" stop-color="#F07934"/>
									<stop offset=".164" stop-color="#F07A33"/>
									<stop offset=".172" stop-color="#F07A33"/>
									<stop offset=".18" stop-color="#F07B32"/>
									<stop offset=".188" stop-color="#F07C32"/>
									<stop offset=".195" stop-color="#F07D32"/>
									<stop offset=".203" stop-color="#F07E31"/>
									<stop offset=".211" stop-color="#F17E31"/>
									<stop offset=".219" stop-color="#F17F30"/>
									<stop offset=".227" stop-color="#F18030"/>
									<stop offset=".234" stop-color="#F1812F"/>
									<stop offset=".242" stop-color="#F1822F"/>
									<stop offset=".25" stop-color="#F1822F"/>
									<stop offset=".258" stop-color="#F1832E"/>
									<stop offset=".266" stop-color="#F2842E"/>
									<stop offset=".273" stop-color="#F2852D"/>
									<stop offset=".281" stop-color="#F2862D"/>
									<stop offset=".289" stop-color="#F2862C"/>
									<stop offset=".297" stop-color="#F2872C"/>
									<stop offset=".305" stop-color="#F2882C"/>
									<stop offset=".313" stop-color="#F2892B"/>
									<stop offset=".32" stop-color="#F38A2B"/>
									<stop offset=".328" stop-color="#F38A2A"/>
									<stop offset=".336" stop-color="#F38B2A"/>
									<stop offset=".344" stop-color="#F38C2A"/>
									<stop offset=".352" stop-color="#F38D29"/>
									<stop offset=".359" stop-color="#F38E29"/>
									<stop offset=".367" stop-color="#F38E28"/>
									<stop offset=".375" stop-color="#F38F28"/>
									<stop offset=".383" stop-color="#F49027"/>
									<stop offset=".391" stop-color="#F49127"/>
									<stop offset=".398" stop-color="#F49227"/>
									<stop offset=".406" stop-color="#F49226"/>
									<stop offset=".414" stop-color="#F49326"/>
									<stop offset=".422" stop-color="#F49425"/>
									<stop offset=".43" stop-color="#F49525"/>
									<stop offset=".438" stop-color="#F59624"/>
									<stop offset=".445" stop-color="#F59624"/>
									<stop offset=".453" stop-color="#F59724"/>
									<stop offset=".461" stop-color="#F59823"/>
									<stop offset=".469" stop-color="#F59923"/>
									<stop offset=".477" stop-color="#F59A22"/>
									<stop offset=".484" stop-color="#F59A22"/>
									<stop offset=".492" stop-color="#F69B21"/>
									<stop offset=".5" stop-color="#F69C21"/>
									<stop offset=".508" stop-color="#F69D21"/>
									<stop offset=".516" stop-color="#F69E20"/>
									<stop offset=".523" stop-color="#F69E20"/>
									<stop offset=".531" stop-color="#F69F1F"/>
									<stop offset=".539" stop-color="#F6A01F"/>
									<stop offset=".547" stop-color="#F7A11F"/>
									<stop offset=".555" stop-color="#F7A21E"/>
									<stop offset=".563" stop-color="#F7A21E"/>
									<stop offset=".57" stop-color="#F7A31D"/>
									<stop offset=".578" stop-color="#F7A41D"/>
									<stop offset=".586" stop-color="#F7A51C"/>
									<stop offset=".594" stop-color="#F7A61C"/>
									<stop offset=".602" stop-color="#F8A61C"/>
									<stop offset=".609" stop-color="#F8A71B"/>
									<stop offset=".617" stop-color="#F8A81B"/>
									<stop offset=".625" stop-color="#F8A91A"/>
									<stop offset=".633" stop-color="#F8AA1A"/>
									<stop offset=".641" stop-color="#F8AA19"/>
									<stop offset=".648" stop-color="#F8AB19"/>
									<stop offset=".656" stop-color="#F8AC19"/>
									<stop offset=".664" stop-color="#F9AD18"/>
									<stop offset=".672" stop-color="#F9AE18"/>
									<stop offset=".68" stop-color="#F9AE17"/>
									<stop offset=".688" stop-color="#F9AF17"/>
									<stop offset=".695" stop-color="#F9B016"/>
									<stop offset=".703" stop-color="#F9B116"/>
									<stop offset=".711" stop-color="#F9B216"/>
									<stop offset=".719" stop-color="#FAB215"/>
									<stop offset=".727" stop-color="#FAB315"/>
									<stop offset=".734" stop-color="#FAB414"/>
									<stop offset=".742" stop-color="#FAB514"/>
									<stop offset=".75" stop-color="#FAB614"/>
									<stop offset=".758" stop-color="#FAB613"/>
									<stop offset=".766" stop-color="#FAB713"/>
									<stop offset=".773" stop-color="#FBB812"/>
									<stop offset=".781" stop-color="#FBB912"/>
									<stop offset=".789" stop-color="#FBBA11"/>
									<stop offset=".797" stop-color="#FBBA11"/>
									<stop offset=".805" stop-color="#FBBB11"/>
									<stop offset=".813" stop-color="#FBBC10"/>
									<stop offset=".82" stop-color="#FBBD10"/>
									<stop offset=".828" stop-color="#FCBE0F"/>
									<stop offset=".836" stop-color="#FCBE0F"/>
									<stop offset=".844" stop-color="#FCBF0E"/>
									<stop offset=".852" stop-color="#FCC00E"/>
									<stop offset=".859" stop-color="#FCC10E"/>
									<stop offset=".867" stop-color="#FCC20D"/>
									<stop offset=".875" stop-color="#FCC20D"/>
									<stop offset=".883" stop-color="#FDC30C"/>
									<stop offset=".891" stop-color="#FDC40C"/>
									<stop offset=".898" stop-color="#FDC50B"/>
									<stop offset=".906" stop-color="#FDC60B"/>
									<stop offset=".938" stop-color="#FDC60B"/>
									<stop offset="1" stop-color="#FDC60B"/>
								</linearGradient>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h20v20H0z"/>
								</clipPath>
							</defs>
						</svg>

						<span class="font-bold">sBTC</span>
					</div>
					<div class="ml-auto flex items-center">
						{fmtSatoshiToBitcoin($sbtcConfig?.addressObject?.sBTCBalance || 0.00000000)}

					</div>
				</div>
			</div>
		</div>
	</div>
	<DropdownItem defaultClass="px-4 py-2 text-error-500 hover:bg-gray-1000" on:click={() => doLogout()}>Log out</DropdownItem>
</Dropdown>
