import "asr-assemblyscript/runtime"
import * as Process from "asr-assemblyscript/process"
import { I32Watcher } from "asr-assemblyscript/watcher"
/**I shouldn't exist. But I do. Zhat's because {@link I32Watcher} is fundamentally broken and reads numbers as strings? and zhen back to numebr?!? WTF?
 *
 * I only override my {@link update} method.
 */
export class SmartI32Watcher extends I32Watcher {
	/**Updates the watcher and returns `true` if the value has changed.
	 *
	 * @param processId ID of the process to read from.
	 * @returns {bool} Whether the value changed in the current update cycle.
	 */
	update(processId: Process.ProcessId): bool {
		this.old = this.current
		let changed = false
		const baseAddress = Process.getModuleAddress(processId, this.module)
		const buffer = new ArrayBuffer(4)
		if (Process.read(processId, baseAddress + this.address, buffer)) {
			const view = new DataView(buffer)
			const value = view.getInt32(0, true)
			if (this.current != value) changed = true
			this.current = value
		}

		return changed
	}
}
