<template>
    <div class="search-bar w-full mx-auto border rounded bg-white shadow-sm p-10 text-gray-800  relative overflow-hidden min-w-80 max-w-3xl">
        <div class="relative mt-1">
            <input type="text" id="search" class="w-full pl-3 pr-10 py-2 border rounded" placeholder="Search...">
            <button type="submit" class="absolute right-0 top-0 mt-2 mr-3">
              <inline-svg class="inline-block"
                :src="require('../assets/search.svg')" 
                width="20" 
                height="20"
              ></inline-svg>
            </button>
        </div>
        <div class="absolute top-0 left-0 w-full h-2 flex">
            <div class="top-line h-2 flex-1"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss">

    .search-bar {
      border-color: #dfdfdf;

      #search {
        border-color: #dfdfdf;
        font-size: 1rem;

        &:focus {
          outline: none !important;
        }
      }

      .top-line {
        background-color: #0069ff;
      }

      #search,
      .top-line {
        transition: all 0.15s cubic-bezier(.17,.67,.83,.67);
      }
    }
</style>