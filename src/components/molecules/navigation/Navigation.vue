<template>
  <div class="flex lg:hidden">
    <button
      type="button"
      class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      @click="mobileMenuOpen = true"
    >
      <span class="sr-only">Open main menu</span>
      <Bars3Icon class="size-6" aria-hidden="true" />
    </button>
  </div>
  <PopoverGroup class="hidden lg:flex lg:gap-x-12">
    <Popover class="relative">
      <PopoverButton
        class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
      >
        Product
        <ChevronDownIcon
          class="size-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <PopoverPanel
          class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5"
        >
          <div class="p-4">
            <div
              v-for="item in products"
              :key="item.name"
              class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
            >
              <div class="flex-auto">
                <a :href="item.href" class="block font-semibold text-gray-900">
                  {{ item.name }}
                  <span class="absolute inset-0" />
                </a>
                <p class="mt-1 text-gray-600">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <a
      href="https://atlan.com/connectors/?ref=/demos/"
      target="_blank"
      class="text-sm/6 font-semibold text-gray-900"
      >Connectors</a
    >
    <a
      href="https://atlan.com/resources/?ref=/demos/"
      target="_blank"
      class="text-sm/6 font-semibold text-gray-900"
      >Resources</a
    >
    <a
      href="https://atlan.com/about/?ref=/demos/"
      target="_blank"
      class="text-sm/6 font-semibold text-gray-900"
      >Company</a
    >
  </PopoverGroup>
  <div class="hidden lg:flex lg:flex-1 lg:justify-end">
    <a
      href="https://atlan.com/forms/talk-to-sales-contact/?ref=/demos/"
      class="text-sm/6 font-semibold bg-muted text-primary rounded-md px-4 py-2"
      >Book a Demo
    </a>
  </div>

  <Dialog
    class="lg:hidden"
    @close="mobileMenuOpen = false"
    :open="mobileMenuOpen"
  >
    <div class="fixed inset-0 z-50" />
    <DialogPanel
      class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
    >
      <div class="flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto dark:hidden"
            src="/public/images/atlan-blue.svg"
            alt=""
          />
        </a>
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = false"
        >
          <span class="sr-only">Close menu</span>
          <XMarkIcon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Product
                <ChevronDownIcon
                  :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                  aria-hidden="true"
                />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2">
                <DisclosureButton
                  v-for="item in [...products, ...callsToAction]"
                  :key="item.name"
                  as="a"
                  :href="item.href"
                  class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >{{ item.name }}</DisclosureButton
                >
              </DisclosurePanel>
            </Disclosure>
            <a
              href="https://atlan.com/connectors/?ref=/demos/"
              target="_blank"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >Connectors</a
            >
            <a
              href="https://atlan.com/resources/?ref=/demos/"
              target="_blank"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >Resources</a
            >
            <a
              href="https://atlan.com/about/?ref=/demos/"
              target="_blank"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >Company</a
            >
          </div>
          <div class="py-6">
            <a
              href="https://atlan.com/forms/talk-to-sales-contact/?ref=/demos/"
              class="text-sm/6 font-semibold bg-muted text-primary rounded-md px-4 py-2"
              >Book a Demo</a
            >
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon
} from '@heroicons/vue/20/solid';

const products = [
  {
    name: 'Data Discovery & Catalog',
    description: 'Get a better understanding of your data',
    href: 'https://atlan.com/data-discovery-catalog/?ref=/demos/'
  },
  {
    name: 'Column Level Lineage',
    description: 'Speak directly to your customers',
    href: 'https://atlan.com/column-level-lineage/?ref=/demos/'
  },
  {
    name: 'Connectors',
    description: 'Your customers’ data will be safe and secure',
    href: 'https://atlan.com/connectors/?ref=/demos/'
  },
  {
    name: 'Intelligent Automation',
    description: 'Connect with third-party tools',
    href: 'https://atlan.com/intelligent-automation/?ref=/demos/'
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: 'https://atlan.com/app-framework/?ref=/demos/'
  }
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon }
];

const mobileMenuOpen = ref(false);
</script>
