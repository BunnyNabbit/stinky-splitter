import "asr-assemblyscript/runtime"
import { SmartI32Watcher } from "./SmartI32Watcher"
import { Addresses } from "./addresses/1.32"
import * as Timer from "asr-assemblyscript/timer"
import * as UserSettings from "asr-assemblyscript/userSettings"
import * as Process from "asr-assemblyscript/process"

let initialized: bool = false
let currentProcessId: Process.ProcessId = 0
let resetting: bool = true
let stagesEntered: Set<number> = new Set()
stagesEntered.add(1)

const timeWatcher = new SmartI32Watcher("ggg.exe", Addresses.time)
const stageWatcher = new SmartI32Watcher("ggg.exe", Addresses.stage)
const deathsWatcher = new SmartI32Watcher("ggg.exe", Addresses.deaths)
const playingMusicWatcher = new SmartI32Watcher("ggg.exe", Addresses.playingMusic)
const showExpandedTimerWatcher = new SmartI32Watcher("ggg.exe", Addresses.showExpandedTimer)
/** "prepare for adventure!" or somezhing */
const ofgm114Id: i32 = 11
/** Goal */
const ofgm122Id: i32 = 15
/** Final goal */
const ofgm165Id: i32 = 37

let splitOnUniqueStage: bool = false

function resetState(): void {
	stagesEntered = new Set()
	stagesEntered.add(1)
	Timer.reset()
	resetting = true
}

export function update(): void {
	if (!initialized) {
		splitOnUniqueStage = UserSettings.addBool("split_on_unique_stage", "Split on unique stage changes", true)
		initialized = true
	}
	Timer.pauseGameTime()
	if (currentProcessId === 0) {
		currentProcessId = Process.attach("ggg.exe")
		if (currentProcessId === 0) return
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
	if (splitOnUniqueStage && !resetting && stageWatcher.changed && !stagesEntered.has(stageWatcher.current)) {
		stagesEntered.add(stageWatcher.current)
		Timer.split()
	}
	const timeTicks = timeWatcher.current
	const displayNanoseconds: f64 = (timeTicks % 60) * 16666666.666666666
	const displaySeconds: i64 = timeTicks / 60
	Timer.setGameTime(displaySeconds, displayNanoseconds as i32)
	if (playingMusicWatcher.changed) {
		if (playingMusicWatcher.current === ofgm114Id) {
			resetState()
		} else if (playingMusicWatcher.current === ofgm122Id || playingMusicWatcher.current === ofgm165Id) {
			Timer.split()
		}
	}
	if (resetting && showExpandedTimerWatcher.changed && showExpandedTimerWatcher.current === 0) {
		resetting = false
		Timer.start()
	}
	Timer.setVariable("stage", stageWatcher.current.toString())
	Timer.setVariable("deaths", deathsWatcher.current.toString())
}
