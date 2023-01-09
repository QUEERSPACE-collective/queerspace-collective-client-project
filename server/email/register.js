function register(token) {
    return (`
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" 
     xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!--[if gte mso 9]><xml>
       <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
      </xml><![endif]-->
      <!-- fix outlook zooming on 120 DPI windows devices -->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
      <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS 7-9 -->
      <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS 7-9 -->
    </head>
    <body style="margin:0; padding:0;" bgcolor="#ffffff" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    
    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="container">
            <tr>
              <td class="container-padding header" align="center">
                <img src="https://static.wixstatic.com/media/b568dc_6f9bfb4d77c04d96b119fc1e23980960~mv2.png/v1/fill/w_226,h_162,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/QS%2520Collective_Logos-02_edited_png.png" >
              </td>
            </tr>
            <tr>
              <td class="container-padding content" align="left">
                <br>
    
    <div class="title" align="center" style="font-size:2em">
      <b>Welcome to QUEERSPACE Collective</b>
    </div>
    <br>
    <div class="body-text" align="center">
    Now that you are a member of QUEERSPACE, you can join our app! In there you will be able to
    customize your account, register for QUEERSPACE events, and find other users. The link below
    will bring you to a page where you can set your password for your account. To login, you will 
    use this email as your username, and the password you create.
    <br><br>
    Please follow the link to sign up:
    <a href="${process.env.PUBLIC_URL}/#/reset/${token}">Register Here!</a>
    <br><br> 
    </div> 
              </td>
            </tr>
            <tr>
              <td class="container-padding footer-text" align="center">
                &copy; QUEERSPACE COLLECTIVE
                Contact us at info@queerspacecollective.org
                Or visit us at our <a href="http://www.queerspacecollective.org">website</a><br>
                <br><br>
              </td>
            </tr>
          </table><!--/600px container -->
    
    </body>
    </html>         
`)
};

module.exports = register;