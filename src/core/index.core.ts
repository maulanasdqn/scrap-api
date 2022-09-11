import { PageEmittedEvents } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { DataTypes } from "../utilities/types/index.types";

const app = puppeteer;

app.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const core = async (url: string) => {
  const browser = await app.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN,
    // executablePath: "/etc/profiles/per-user/ms/bin/microsoft-edge",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  console.log("Accessing page....");
  const page = await browser.newPage();

  await page.setViewport({ width: 300, height: 300 });

  if (url.includes("blibli.com")) {
    await page.setRequestInterception(true);
    page.on(PageEmittedEvents.Request, (req) => {
      if (
        !["document", "xhr", "fetch", "script"].includes(req.resourceType())
      ) {
        return req.abort();
      }
      req.continue();
    });
    await page.goto(url, {
      waitUntil: "load",
    });
    console.log("Request from blibli");
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
    await page.setRequestInterception(true);
    page.on(PageEmittedEvents.Request, (req) => {
      if (
        !["document", "xhr", "fetch", "script"].includes(req.resourceType())
      ) {
        return req.abort();
      }
      req.continue();
    });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
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
    await page.setRequestInterception(true);
    page.on(PageEmittedEvents.Request, (req) => {
      if (
        !["document", "xhr", "fetch", "script"].includes(req.resourceType())
      ) {
        return req.abort();
      }
      req.continue();
    });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
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
    await page.setRequestInterception(true);
    page.on(PageEmittedEvents.Request, (req) => {
      if (
        !["document", "xhr", "fetch", "script"].includes(req.resourceType())
      ) {
        return req.abort();
      }
      req.continue();
    });
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
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
    await page.setRequestInterception(true);
    page.on(PageEmittedEvents.Request, (req) => {
      if (
        !["document", "xhr", "fetch", "script"].includes(req.resourceType())
      ) {
        return req.abort();
      }
      req.continue();
    });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    console.log("Request from Jakmall");
    try {
      const productName = await page.evaluate(
        () => document?.querySelector(`.dp__name`)?.textContent
      );

      const productPrice = await page.evaluate(
        () =>
          document?.querySelector(`.dp__price.dp__price--2.format__money`)
            ?.textContent
      );

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
