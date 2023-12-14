import {Request, Response} from 'express';
import {getUrlSearchParams, loadBrowser} from '../utils/helpers.js';

export class RecieptHandler {
  async download(x: Request, res: Response) {
    const page = await (await loadBrowser()).newPage();
    const {token} = getUrlSearchParams<Record<string, string>>(x.url);
    await page.setExtraHTTPHeaders({
      Authorization: 'Bearer ' + token + '',
    });
    const href = process.env['APP_CRM'] + '/receipt';
    console.log(href);

    await page.goto(href);
    const pdf = await page.pdf({
      scale: 0.85,
      width: '595px',
      printBackground: true,
      preferCSSPageSize: true,
      height: '842px',
    });
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.byteLength,
    });
    const pageTitle = await page.title();
    await page.close();
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + pageTitle + '.pdf'
    );
    return res.send(pdf);
  }
}
