// /src/composables/usePrinter.ts

import { ref, type Ref } from 'vue';

interface UsePrinterReturn {
  isPrinting: Ref<boolean>;
  print: (elementId: string) => void;
}

export function usePrinter(): UsePrinterReturn {
  const isPrinting = ref<boolean>(false);
  const printClassName = 'printable-area';

  /**
   * Applies a print-specific class to an element, triggers the print dialog,
   * and removes the class afterwards.
   * @param {string} elementId The ID of the element to print.
   */
  const print = (elementId: string): void => {
    const elementToPrint = document.getElementById(elementId);

    if (!elementToPrint) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }

    isPrinting.value = true;

    try {
      // 1. Add main class before calling print
      elementToPrint.classList.add(printClassName);

      // 2. Call print dialog
      window.print();
    } catch (error) {
      console.error('An error occurred during printing:', error);
    } finally {
      // 3. Remove main class after print dialog is closed
      elementToPrint.classList.remove(printClassName);
      isPrinting.value = false;
    }
  };

  return {
    isPrinting,
    print,
  };
}
