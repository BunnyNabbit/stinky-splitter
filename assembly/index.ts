import "asr-assemblyscript/runtime"
import { SmartI32Watcher } from "./SmartI32Watcher"
import * as Timer from "asr-assemblyscript/timer"
import * as Process from "asr-assemblyscript/process"

let currentProcessId: Process.ProcessId = 0
let resetting: bool = true

const timeWatcher = new SmartI32Watcher("ggg.exe", 0x15d0a0)
const stageWatcher = new SmartI32Watcher("ggg.exe", 0x15115c)
const deathsWatcher = new SmartI32Watcher("ggg.exe", 0x1676a8)
const playingMusicWatcher = new SmartI32Watcher("ggg.exe", 0x151220)
const showExpandedTimerWatcher = new SmartI32Watcher("ggg.exe", 0x169a10)
/** "prepare for adventure!" or somezhing */
const ofgm114Id: i32 = 11
/** Goal */
const ofgm122Id: i32 = 15
/** First level's music */
const ofgm113Id: i32 = 10

export function update(): void {
	Timer.pauseGameTime()
	if (currentProcessId === 0) {
		currentProcessId = Process.attach("ggg.exe")
		if (currentProcessId === 0) {
			return
		}
	}
	if (!Process.isOpen(currentProcessId)) {
		Process.detach(currentProcessId)
		currentProcessId = 0
		return
	}
	stageWatcher.update(currentProcessId)
	timeWatcher.update(currentProcessId)
	deathsWatcher.update(currentProcessId)
	playingMusicWatcher.update(currentProcessId)
	showExpandedTimerWatcher.update(currentProcessId)
	const timeTicks = timeWatcher.current
	const displayNanoseconds: f64 = (timeTicks % 60) * 16666666.666666666
	const displaySeconds: i64 = timeTicks / 60
	Timer.setGameTime(displaySeconds, displayNanoseconds as i32)
	if (playingMusicWatcher.changed) {
		if (playingMusicWatcher.current === ofgm114Id) {
			Timer.reset()
			resetting = true
		} else if (playingMusicWatcher.current === ofgm122Id) {
			Timer.split()
		} else if (resetting && playingMusicWatcher.current === ofgm113Id) {
			resetting = false
			Timer.start()
		}
	}
	if (resetting && showExpandedTimerWatcher.changed) {
		resetting = false
		Timer.start()
	}
	Timer.setVariable("stage", stageWatcher.current.toString())
	Timer.setVariable("deaths", deathsWatcher.current.toString())
}
