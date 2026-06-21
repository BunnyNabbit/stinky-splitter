import { Address } from "asr-assemblyscript/process"
import { BaseGassyGaoGaoAddresses } from "./BaseGassyGaoGaoAddresses"

export class Addresses extends BaseGassyGaoGaoAddresses {
	static readonly time: Address = 0x15d0a0
	static readonly stage: Address = 0x15115c
	static readonly deaths: Address = 0x1676a8
	static readonly playingMusic: Address = 0x151220
	static readonly showExpandedTimer: Address = 0x169a10
}
