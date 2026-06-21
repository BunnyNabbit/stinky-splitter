import { Address } from "asr-assemblyscript/process"

export abstract class BaseGassyGaoGaoAddresses {
	/** The in-game time. Only increments when Aruppy can be controlled. */
	static readonly time: Address
	/** The current stage. This changes after a transition. */
	static readonly stage: Address
	/** Number of times Aruppy died. This increments on a transition after his death. */
	static readonly deaths: Address
	/** The internal ID of the music playing. */
	static readonly playingMusic: Address
	/** Whether the timer should display two millisecond digits instead of one. This changes when Aruppy dies, on stage transition or on goal crystal collection. */	
	static readonly showExpandedTimer: Address
}
