import java.util.HashMap;

class usehashmap {

    static boolean areAnagram(String str1, String str2) {

        if (str1.length() != str2.length()) {
            return false;
        }

        HashMap<Character, Integer> hmap1 = new HashMap<Character, Integer>();

        char arr1[] = str1.toCharArray();

        for (char c : arr1) {
            hmap1.put(c, hmap1.getOrDefault(c, 0) + 1);
        }

        for (char c : str2.toCharArray()) {
            if (!hmap1.containsKey(c)) {
                return false;
            }
            int count = hmap1.get(c);
            if (count == 1) {
                hmap1.remove(c);
            } else {
                hmap1.put(c, count - 1);
            }
        }

        return hmap1.isEmpty();
    }

    // Test function
    public static void test(String str1, String str2) {

        System.out.println("Strings to be checked are:\n"
                + str1 + "\n" + str2 + "\n");

        if (areAnagram(str1, str2))
            System.out.println("The two strings are "
                    + "anagrams of each other\n");
        else
            System.out.println("The two strings are not"
                    + " anagrams of each other\n");
    }

    public static void main(String args[]) {

        String str1 = "geeksforgeeks";
        String str2 = "forgeeksgeeks";

        test(str1, str2);

        str1 = "geeksforgeeks";
        str2 = "geeks";

        test(str1, str2);
    }
}
