import { CONFIG } from "@/configs";

interface ResetPasswordTemplateProps {
  url: string;
  fullName: string;
  code: string;
  token: string;
}

const ResetPassword = ({
  url,
  fullName,
  code,
  token,
}: ResetPasswordTemplateProps): string => `<!DOCTYPE html>
<html lang="en-US">

<head>
  <meta charset="UTF-8">
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Reset Password Email Template.">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Reset Password Email</title>

  <style type="text/css">
    *,
    ::after,
    ::before {
      box-sizing: inherit;
    }

    a:hover {
      text-decoration: underline !important;
    }
  </style>

</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  <!--100% body table-->
  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
      <td>
        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
          align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <a href="${url}" title="eCommerce" target="_blank">
                <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="eCommerce logo"
                  alt="eCommerce logo">
              </a>
            </td>
          </tr>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06); border-radius:16px">
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <h1
                      style="color:#252425; font-weight:500; margin:0;font-size:24px;font-family:'Rubik',sans-serif; text-align:center">
                      Đổi Mật Khẩu</h1>

                    <div style="margin:29px auto 26px; border-bottom:1px solid #cecece; width:100px;" />

                    <h3 style="font-size:20px">Hi ${fullName}</h3>

                    <p style="color:#252425;font-size:14px;line-height:24px;">
                      Chúng tôi nhận được yêu cầu đổi mật khẩu từ bạn. Một liên kết duy nhất để đặt lại mật khẩu đã được
                      tạo cho bạn.

                    </p>
                    <p style="color:#252425;font-size:14px;line-height:24px;">
                      Để đặt lại mật khẩu của bạn, hãy nhấp vào nút bên dưới và nhập mã code: <span
                        style="font-weight: 700; font-size: 18px;">${code}</span>
                    </p>

                    <span>
                      Không chia sẽ link này với bất kì ai!</span>
                    <div style="margin: 35px auto 0; width: fit-content">
                      <a href="${process.env.URI_CLIENT}/auth/${CONFIG.routes.RESET_PASSWORD}?accessToken=${token}"
                        target="_blank"
                        style="background:#00aeef;text-decoration:none !important; font-weight:500; color:#fff; font-size:14px;padding:10px 24px;border-radius:50px;">
                        Đặt lại mật khẩu
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                &copy; <strong>www.test.com</strong></p>
            </td>
          </tr>
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;

export default ResetPassword;
