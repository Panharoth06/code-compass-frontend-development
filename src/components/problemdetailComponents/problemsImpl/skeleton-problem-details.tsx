import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Play, Share, SunIcon, Upload } from "lucide-react"

export default function CodeCompassSkeleton() {
    return (
        <div className="flex h-screen flex-col bg-[#1e1e1e] text-white">
            {/* Header */}
            <header className="border-b border-border px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Skeleton className="h-12 w-12 bg-[#3e3e42]" />
                    <h6 className="font-semibold text-white/90 text-sm sm:text-base">CodeCompass</h6>
                </div>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                    <Button variant="outline" size="sm" className="text-white/80"><Share className="w-4 h-4 mr-1 sm:mr-2 text-white/80" /> Share</Button>
                    <span className={`text-yellow-500`}>
                        <SunIcon className="w-5 h-5" />
                    </span>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#3e3e42] bg-[#252526] text-sm">
                <button className="border-b-2 border-[#4ec9b0] px-6 py-3 text-white">Description</button>
                <button className="px-6 py-3 text-gray-400 hover:text-white">Solutions</button>
                <button className="px-6 py-3 text-gray-400 hover:text-white">Submissions</button>
                <button className="px-6 py-3 text-gray-400 hover:text-white">Discussions</button>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Problem Description */}
                <div className="flex w-1/2 flex-col border-r border-[#3e3e42] bg-[#1e1e1e] p-8">
                    {/* Problem Title */}
                    <div className="mb-6">
                        <Skeleton className="mb-3 h-8 w-64 bg-[#3e3e42]" />
                        <div className="flex items-center gap-3">
                            {/* <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">EASY</span> */}
                            <Skeleton className="h-5 w-11 bg-[#3e3e42]" />
                            <Skeleton className="h-5 w-20 bg-[#3e3e42]" />
                            <Skeleton className="h-5 w-16 bg-[#3e3e42]" />
                        </div>
                    </div>

                    {/* Problem Description */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                            <Skeleton className="h-4 w-11/12 bg-[#3e3e42]" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                        </div>

                        {/* Highlighted Requirements Box */}
                        <div className="space-y-3 border-l-4 border-yellow-600 bg-yellow-500/5 p-4">
                            <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                            <Skeleton className="h-4 w-10/12 bg-[#3e3e42]" />
                            <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                        </div>

                        {/* Input Specification */}
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-48 bg-[#3e3e42]" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                                <Skeleton className="h-4 w-9/12 bg-[#3e3e42]" />
                            </div>
                        </div>

                        {/* Output Specification */}
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-48 bg-[#3e3e42]" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                            </div>
                        </div>

                        {/* Examples */}
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-56 bg-[#3e3e42]" />
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-24 bg-[#3e3e42]" />
                                <Skeleton className="h-4 w-20 bg-[#3e3e42]" />
                                <Skeleton className="h-4 w-24 bg-[#3e3e42]" />
                                <div className="space-y-2 pt-2">
                                    <Skeleton className="h-4 w-full bg-[#3e3e42]" />
                                    <Skeleton className="h-4 w-10/12 bg-[#3e3e42]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="flex w-1/2 flex-col bg-[#1e1e1e]">
                    {/* Editor Header with Code Editor label and controls */}
                    <div className="flex items-center justify-between border-b border-[#3e3e42] bg-[#1f1f1f] px-4 py-2.5">
                        <div className="flex items-center gap-2">
                                <Skeleton className="h-11 w-11 bg-[#3e3e42]" />
                            <span className="font-medium text-based">Code Editor</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded bg-[#3e3e42]" />
                            <Skeleton className="h-6 w-12 bg-[#3e3e42]" />
                            <Skeleton className="h-6 w-6 rounded bg-[#3e3e42]" />
                        </div>
                    </div>

                    {/* Theme Selector */}
                    <div className="border-b border-[#3e3e42] bg-[#1f1f1f] px-4 py-2.5">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Theme:</span>
                            <Skeleton className="h-7 w-48 bg-[#3e3e42]" />
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm">
                        <div className="space-y-1">
                            {/* Line 1 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">1</span>
                                <Skeleton className="h-5 w-48 bg-[#3e3e42]" />
                            </div>
                            {/* Line 2 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">2</span>
                                <Skeleton className="h-5 w-56 bg-[#3e3e42]" />
                            </div>
                            {/* Line 3 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">3</span>
                                <div className="h-5 w-4" />
                            </div>
                            {/* Line 4 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">4</span>
                                <Skeleton className="h-5 w-40 bg-[#3e3e42]" />
                            </div>
                            {/* Line 5 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">5</span>
                                <Skeleton className="h-5 w-64 bg-[#3e3e42]" />
                            </div>
                            {/* Line 6 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">6</span>
                                <Skeleton className="h-5 w-52 bg-[#3e3e42]" />
                            </div>
                            {/* Line 7 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">7</span>
                                <Skeleton className="h-5 w-56 bg-[#3e3e42]" />
                            </div>
                            {/* Line 8 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">8</span>
                                <div className="h-5 w-4" />
                            </div>
                            {/* Line 9 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">9</span>
                                <Skeleton className="h-5 w-72 bg-[#3e3e42]" />
                            </div>
                            {/* Line 10 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">10</span>
                                <div className="h-5 w-4" />
                            </div>
                            {/* Line 11 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">11</span>
                                <Skeleton className="h-5 w-32 bg-[#3e3e42]" />
                            </div>
                            {/* Line 12 */}
                            <div className="flex gap-6">
                                <span className="w-6 text-right text-gray-600">12</span>
                                <Skeleton className="h-5 w-8 bg-[#3e3e42]" />
                            </div>
                        </div>
                    </div>

                    {/* Editor Footer with Run and Submit buttons */}
                    <div className="p-3 border-b border-border flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#EDE7E9] text-white/80"
                            >
                                <Play className="w-4 h-4 mr-2 text-white/80" />
                                Run (Ctrl+Enter)
                            </Button>
                            <Button
                                size="sm"
                                className=" bg-primary/90 text-black"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Submit
                            </Button>
                        </div>
                    </div>

                    {/* Test Cases Section */}
                    <div className="border-t border-[#3e3e42] bg-[#252526]">
                        <div className="flex border-b border-[#3e3e42] text-sm">
                            <button className="border-b-2 border-white px-4 py-2.5 text-white">Test Cases</button>
                            <button className="px-4 py-2.5 text-gray-400 hover:text-white">Results</button>
                        </div>

                        <div className="p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-300">Custom Test Cases</span>
                                <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                                    + Add Case
                                </Button>
                            </div>

                            {/* Test Case Card */}
                            <div className="space-y-3 rounded border border-[#3e3e42] bg-[#1e1e1e] p-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-300">Case 1</span>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-5 rounded bg-[#3e3e42]" />
                                        <Skeleton className="h-5 w-5 rounded bg-[#3e3e42]" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-xs text-gray-400">Input:</span>
                                    <div className="rounded bg-[#252526] p-2 font-mono text-sm">
                                        <Skeleton className="h-4 w-8 bg-[#3e3e42]" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-xs text-gray-400">Expected Output:</span>
                                    <div className="rounded bg-[#252526] p-2 font-mono text-sm">
                                        <Skeleton className="h-4 w-12 bg-[#3e3e42]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
