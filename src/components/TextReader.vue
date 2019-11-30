<template>
    <label class="text-reader">
        Считать файл
        <input type="file" @change="readFile"/>
    </label>
</template>

<script>
    export default {
        methods: {
            readFile(ev) {
                const file = ev.target.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.$emit("load", e.target.result);
                };
                reader.readAsText(file);
            }
        }
    };
</script>

<style>
    .text-reader {
        position: relative;
        overflow: hidden;
        display: inline-block;

        border: 2px solid black;
        border-radius: 5px;
        padding: 8px 12px;
        cursor: pointer;
        margin-top: 20px;
        color: rgb(44, 62, 80);
    }

    .text-reader input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0;
    }
</style>