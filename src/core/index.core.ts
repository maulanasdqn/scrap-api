import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { DataTypes } from "../utilities/types/index.types";

const app = puppeteer;

app.use(StealthPlugin());

const core = async (url: string) => {
  const browser = await app.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  console.log("Accessing page....");
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 600 });

  await page.goto(url, {
    timeout: 0,
  });

  console.log("Access url eccommerse");

  if (url.includes("blibli.com")) {
    console.log("Request from blibli");
    await page.waitForSelector(".product-name");
    try {
      const productName = await page.evaluate(
        () => document?.querySelector(".product-name")?.textContent
      );

      const productPrice = await page.evaluate(
        () => document?.querySelector(".product-price")?.textContent
      );

      let obj: DataTypes = {
        product_name: productName.trim(),
        product_price: productPrice.trim(),
      };

      await browser.close();

      return obj;
    } catch (err) {
      console.log(err);
    }
  }

  if (url.includes("lazada.co.id")) {
    console.log("Request from Lazada");
    await page.waitForSelector(".pdp-mod-product-badge-title");
    try {
      console.log("Lazada Search product name");
      const productName = await page.evaluate(
        () =>
          document?.querySelector(".pdp-mod-product-badge-title")?.textContent
      );

      console.log("Lazada Search product price");
      const productPrice = await page.evaluate(
        () => document?.querySelector(".pdp-price")?.textContent
      );

      console.log(productName);
      console.log(productPrice);

      let obj: DataTypes = {
        product_name: productName,
        product_price: productPrice,
      };

      await browser.close();

      return obj;
    } catch (err) {
      console.log(err);
    }
  }

  if (url.includes("tokopedia.com")) {
    console.log("Request from Tokopedia");
    await page.waitForSelector(".css-1320e6c");
    try {
      console.log("Tokopedia Search product name");
      const productName = await page.evaluate(
        () => document?.querySelector(".css-1320e6c")?.textContent
      );

      console.log("Tokopedia Search product price");
      const productPrice = await page.evaluate(
        () => document?.querySelector(".price")?.textContent
      );

      console.log(productName);
      console.log(productPrice);

      let obj: DataTypes = {
        product_name: productName,
        product_price: productPrice,
      };

      await browser.close();

      return obj;
    } catch (err) {
      console.log(err);
    }
  }

  if (url.includes("shopee.co.id")) {
    console.log("Request from Shopee");
    await page.waitForSelector("._2rQP1z");
    try {
      console.log("Shopee Search product name");
      const productName = await page.evaluate(
        () => document?.querySelector(`._2rQP1z`)?.textContent
      );

      console.log("Shopee Search product price");
      const productPrice = await page.evaluate(
        () => document?.querySelector(`._2Shl1j`)?.textContent
      );

      console.log(productName);
      console.log(productPrice);

      let obj: DataTypes = {
        product_name: productName,
        product_price: productPrice,
      };

      await browser.close();

      return obj;
    } catch (err) {
      console.log(err);
    }
  }

  if (url.includes("jakmall.com")) {
    console.log("Request from Jakmall");
    await page.waitForSelector(".dp__name");
    try {
      console.log("Shopee Search product name");
      const productName = await page.evaluate(
        () => document?.querySelector(`.dp__name`)?.textContent
      );

      console.log("Shopee Search product price");
      const productPrice = await page.evaluate(
        () =>
          document?.querySelector(`.dp__price.dp__price--2.format__money`)
            ?.textContent
      );

      console.log(productName);
      console.log(productPrice);

      let obj: DataTypes = {
        product_name: productName,
        product_price: productPrice,
      };

      await browser.close();

      return obj;
    } catch (err) {
      console.log(err);
    }
  }
};

export default core;
