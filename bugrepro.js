// get an audio buffer with a 300Hz sine tone for 5s:

const offlinectx = new OfflineAudioContext(1, 5 * 44100, 44100)

const osc = offlinectx.createOscillator()

osc.frequency.value = 300

osc.connect(offlinectx.destination)

osc.start()

offlinectx.startRendering()


offlinectx.oncomplete = (e) => {
    const out = document.querySelector(".buffer")
    const state = document.querySelector(".state")
    const play = document.querySelector(".play")

    const buffer = e.renderedBuffer

    const channel = buffer.getChannelData(0)

    const int = setInterval(() => {
        // check if arraybuffer is detached:
        if (channel.buffer.byteLength === 0) {
            out.textContent = "ArrayBuffer is detached"
        } else {
            out.innerHTML = `Float32Array[${channel.slice(0, 100).join(", ")}, ...]`
        }
    })

    const ctx = new AudioContext()

    const src = ctx.createBufferSource()

    src.connect(ctx.destination)

    play?.addEventListener("click", () => {
        ctx.resume()

        setTimeout(() => {
            state.innerHTML = "setting buffer"
            src.buffer = buffer
        }, 2000)

        setTimeout(() => {
            state.innerHTML = "starting source"
            src.start()
        }, 5000)

        src.onended = () => {
            state.innerHTML = "source ended"
            clearInterval(int)
        }
    })
}
