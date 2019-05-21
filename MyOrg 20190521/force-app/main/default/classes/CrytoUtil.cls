public class CrytoUtil 
{
    private static Blob key = null;
    static
    {
        AESKey__c AESKey = AESKey__c.getInstance('AESKey');
        if(AESKey == null)
        {
            key = EncodingUtil.convertFromHex('11fa421931b9622fc5b41dfd77fc2595');
        }
        try
        {
            key = EncodingUtil.convertFromHex(AESKey__c.getInstance('AESKey').key__c);
        }
        catch(exception e)
        {
            key = EncodingUtil.convertFromHex('11fa421931b9622fc5b41dfd77fc2595');
        }
    }
    //加密方法
    public static String encrypt(String clear)
    {
        System.debug('----key-----' + EncodingUtil.convertToHex(key));
        Blob clearBlob = Blob.valueOf(clear);   
        Blob encrypted  = Crypto.encryptWithManagedIV('AES128', key, clearBlob);
        return EncodingUtil.convertToHex(encrypted);
    }
    //解密方法
    public static String decrypt(String encryptText)
    {
        System.debug('----key-----' + EncodingUtil.convertToHex(key));
        Blob encrypted = EncodingUtil.convertFromHex(encryptText);
        Blob decrypted = Crypto.decryptWithManagedIV('AES128', key, encrypted);
        return decrypted.toString();
    }

}