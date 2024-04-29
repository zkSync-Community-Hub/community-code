<template>
  <div class="-mt-6 flex w-full flex-col divide-y divide-gray-200 dark:divide-gray-800">
    <HeadlessDisclosure
      v-for="(tab, index) in tabs"
      :key="index"
      v-slot="{ open }"
    >
      <HeadlessDisclosureButton
        class="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex w-full flex-shrink-0 items-center gap-x-1.5 rounded-none py-6 text-left text-lg font-medium text-gray-500 underline-offset-4 hover:text-gray-700 hover:no-underline focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-75 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <UIcon
          name="i-heroicons-chevron-down-20-solid"
          class="h-5 w-5 flex-shrink-0 transform font-bold transition-transform duration-200"
          :class="open ? '' : '-rotate-90'"
        />
        <span class="text-gray-900 dark:text-white">{{ tab.label }}</span>
      </HeadlessDisclosureButton>
      <HeadlessDisclosurePanel class="py-4 pl-6 text-base text-gray-500 dark:text-gray-100">
        <component :is="tab.component" />
      </HeadlessDisclosurePanel>
    </HeadlessDisclosure>
  </div>
</template>

<script setup lang="ts">
/**
 * An accordion style component that allows
 * for multiple panels to be open at once.
 *
 * Use Panel component to slot in panels.
 *
 * @example
 * ::drop-panel
 *  ::panel{label="Tab Label"}
 *  Panel Content
 *  ::
 * ::
 */
import { useSlots, computed } from 'vue';

const slots = useSlots();

const tabs = computed(() => {
  return (
    slots.default?.().map((slot, index) => {
      if (slot.props?.label === undefined) {
        throw new Error(`DropPanel: Panel at index ${index} is missing a label prop.`);
      } else {
        return {
          index,
          label: slot.props.label,
          component: slot,
        };
      }
    }) || []
  );
});
</script>
