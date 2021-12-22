open util/integer 
 

//----SIGNATURES---- 

abstract sig User { } 
 

sig Farmer extends User { 

location: one Location, 

typeP: set ProductionTypes ,

production: set Production,

discussion: set Discussion,

comment: set Comment

}
 

sig Policymaker extends User { 

badgeNumber: one Int 

}{badgeNumber >= 0}

 

sig Location { 

weather: set Weather 
} 

 

sig Weather { 

month: one Int, 

day: one Int ,

hour: one Int 
}{day > 0 and month > 0 and hour > 0}


sig Discussion {
commentDiscussion : set Comment}

sig Comment {}
 

//The most common productions in Telangana according to Professor Jayashankar, Professor at the //Telangana state agricultural university 

enum ProductionTypes { 

Rice, 

Corn, 

Jowar, 

Cotton, 

Castor, 

Groundnut, 

Soya, 

RedGram, 

GreenGram, 

BlackGram, 

Sesame 

} 
 

sig Production{ 

kilograms: one Int, 

type: one ProductionTypes, 
} {kilograms > 0}


//FACTS

//A production is always associated with a farmer

fact farmerProduction {
all p: Production | one f: Farmer | p in f.production
}

//A production have a type in the farmer typeP

fact farmerTypeProd{
all p: Production| one f: Farmer| p in f.production && 
	p.type in f.typeP
}

//A weather is always associated with a location
fact weatherLocation{
all w: Weather | one l: Location | w in l.weather 
}

//Polimakers should have different bedge number

fact differenteBedge {
all p1: Policymaker , p2: Policymaker | p1.badgeNumber = p2.badgeNumber implies p1 = p2
}

//Every comment is always associated witha one farmer
fact commentFarmer {
all c: Comment | one f: Farmer | c in f.comment
}


//Every comment is always associated with one discussion
fact commentDiscussion {
all c: Comment | one d: Discussion | c in d.commentDiscussion
}

//Every discussion is always associated with one farmer
fact discussionFarmer {
all d: Discussion | one f: Farmer | d in f.discussion
}


pred show{
#Farmer > 1
#Policymaker > 1
#Production = 3
#Location= 2
#Weather > 2
#Comment = 4
#Discussion= 4}

run show for 10

