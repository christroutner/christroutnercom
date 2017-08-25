/*********************************************
Project : lcd_example.c
Version : 1.0
Date    : 7/08/2004
Author  : Chris Troutner                  
Company : MyRobot                                
Comments: 	This is the first example program.
			It increments i every second, and 
			displays its value on the LCD.

Robot Type:	Model-T or Mini-T
*********************************************/
//Compiler Derectives
	
//Includes
#include <modelt.h>	

//Global Variables
char str[16]; 			//This variable is used to store a formated string before it send sent to 
						//the LCD.

//Main
int main(void)
{

//Local Variables
	float pi=3.1415926535898;

//Initialization
	reset();			//Reset and all ports and peripherials

	lcd_init();			//Initialize the LCD 

//Main Exectution Code

	

	while (1) 						//Loop forever.
	{				
		//This block illustrates how to display a line of text using the line1() function call 
		//and the strcpy() line formating function.
		strcpy(str, "This is on Line1");		
		line1(str);
		
		//This block illustrates how to use the sprintf() formating function and the line2() 
		//function to display text on line 2 of the LCD.
		sprintf(str, "pi = %1.9f",pi);
		line2(str);
	
		ms_spin(5000);		//Wait 5000 milliseconds (5 seconds)
		
		clr_lcd();			//Clear the LCD display
		
		//This function uses the pstrp() function to center the string 'Centered' on line 1 of 
		//the LCD.
		strcpy(str, "Centered     ");		//Copy the string 'Centered' to the character 
											//array 't'.
		pstrp(str, 4); 						//Insert the string stored in 't' four characters 
											//in from line 1.
		strcpy(str, "Lines           ");	//Copy the string 'Lines' to the character array 't'.
		pstrp(str, 22);						//Print thE string stored in 't' five characters 
											//(22 - 17 = 5)  in from line 2.

		ms_spin(5000);
	}
	  
}


