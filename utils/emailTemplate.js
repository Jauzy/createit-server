module.exports = (title, subtitle, btn_label, url, user) => {
    return (
        `
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" bgcolor="#66809b"
                                style="background-size:cover; background-position:top;border-radius:20px;height="
                                400""="">
                                <table class="col-600" width="600" height="400" border="0" align="center"
                                    style="background-color:rgba(0,0,0,0.7);border-radius:20px;" cellpadding="0"
                                    cellspacing="0">
                                    <tbody>

                                        <tr>
                                            <td height="40"></td>
                                        </tr>


                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                                                <h1>CREATEIT<strong style='color:#00ADB5'>.</strong></h1>
                                            </td>
                                        </tr>



                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
                                                ${title}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center" style="padding:20px">
                                                <a href='${url}'
                                                    style="padding:10px;color:white;background-color:#00ADB5;border-radius:10px;font-size:16px;">${btn_label}</a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; line-height:24px; font-weight: 300;">
                                                ${subtitle}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center" style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; line-height:24px; font-weight: 300;">
                                                Account Information :<br />
                                                Name : <strong>${user.name}</strong> <br />
                                                Email : <strong>${user.email}</strong>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td height="50"></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
        `
    )
}