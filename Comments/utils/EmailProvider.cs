using MailKit.Net.Smtp;
using MimeKit;
using System.IO;
using System.Configuration;
using System.Collections.Generic;

namespace Comments.utils
{
    public static class EmailProvider
    {
        public static void SendEmail(string comment, string user)
        {
            var message = new MimeMessage();
            string email = ConfigurationManager.AppSettings["Email"];
            string password = ConfigurationManager.AppSettings["Password"];
            message.From.Add(new MailboxAddress("TEAMSIGHSTS", email));
            message.To.AddRange(getEmailsTo());

            message.Subject = "Report Notification Review";
            string pathFileName = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "App_Start", "EmailTemplate.html");
            string bodyHtml = File.ReadAllText(pathFileName);
            bodyHtml = bodyHtml.Replace("{{comment}}", comment);
            bodyHtml = bodyHtml.Replace("{{user}}", user);
            var builder = new BodyBuilder();
            builder.HtmlBody = bodyHtml;
            message.Body = builder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.CheckCertificateRevocation = false;
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(email, password);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        public static List<MailboxAddress> getEmailsTo()
        {
            List<MailboxAddress> list = new List<MailboxAddress>();
            string emails = ConfigurationManager.AppSettings["To"];
            var emailList = emails.Split(';');
            for (int i = 0; i< emailList.Length; i++)
            {
                list.Add(new MailboxAddress("", emailList[i]));
            }
            return list;
        }
    }
}