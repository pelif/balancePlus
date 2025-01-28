<template>
    <div>
        <h1>Revenue</h1>
        <ul>
            <li v-for="category in categories" :key="category.id">
                {{ category.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        categories: Array
    }
}
</script>
