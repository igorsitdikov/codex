<template>
    <div>
        <a class="text-writer" :href="url" :download="download">Скачать файл</a>
    </div>
</template>

<script>
    export default {
        name: "TextWriter",
        props: {
            url: String,
            download: String
        }
    }
</script>

<style scoped>

    .text-writer {
        position: relative;
        overflow: hidden;
        display: inline-block;

        border: 2px solid black;
        border-radius: 5px;
        padding: 8px 12px;
        cursor: pointer;
        margin-top: 20px;
        text-decoration: none;
        color: rgb(44, 62, 80);
    }

</style>