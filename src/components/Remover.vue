<template>
<button type="button"
        class="btn-close btn__delete" 
        aria-label="Close"
        @click="$emit('deleteEl')"
        ></button>
</template>

<script>
export default {
    name: 'Remover'
}
</script>